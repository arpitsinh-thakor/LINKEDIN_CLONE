import axios from 'axios'
import React, {useState, useEffect} from 'react'


interface commetSchema {
    text: string,
    author:{
        name: string
    }
}

const Comments = ({postId}:{postId: number}) => {

    const [comments, setComments] = useState<commetSchema[]>([])

    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.post('/api/users/comments', {postId})
            const data = await res.data
            console.log(data)
            setComments(data)
            console.log("comments.tsx")
            console.log(comments)
        }
        fetchComments()
    }, [])
    return (
        <div>
            <h4>Comments</h4>
            <ul>
               {
                comments && comments.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.text}</p>
                        <p>{comment.author.name}</p>
                    </li>
                ))
               }
            </ul>
        </div>
    )
}

export default Comments