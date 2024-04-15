import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { stat } from "fs";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        console.log(user);

        if(!user){
            return NextResponse.json({
                status: 404,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({
                status: 401,
                message: "Invalid credentials"
            });
        }


        return NextResponse.json({
                    message: "User Logged In successfully",
                    user
                });
    } 
    catch (err) {
        console.log(err);
        return NextResponse.json({
        message: "Error logging user"
        });
    } 
    finally {
        await prisma.$disconnect();
    }
}