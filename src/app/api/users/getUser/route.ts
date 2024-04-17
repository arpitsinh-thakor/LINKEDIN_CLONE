import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json();
        const userId = Number(reqBody.userId);

        //find corresponding user's details
        const user = await prisma.following.findUnique({
            where: {
                id: userId
            }
        });
        
        if(!user){
            console.log("User does not exist");
            return NextResponse.json({
                status: 404,
                message: "User does not exist"
            });
        }

        return NextResponse.json({
            message: "User found",
            user
        });
    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Error getting users"
        });
    }
    finally{
        await prisma.$disconnect();
    }
}