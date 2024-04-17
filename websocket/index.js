import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const port = 4000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});



io.on('connection', (socket) => {
    console.log('User Connected');
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
    
    socket.on('message', ({message , room, userName, roomName}) => {
        console.log(`Message: ${message} for room: ${room}`);
        io.to(room).emit('receive-message', {message, userName, roomName});
    })

    socket.on('join-room', ({roomName}) => {
        console.log(`Joining room: ${roomName}`);
        socket.join(roomName);
    })

    socket.emit('welcome', `Welcome to the chat ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});