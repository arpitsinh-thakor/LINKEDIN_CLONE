import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json();
        const userId = Number(reqBody.userId);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user){
            return NextResponse.json({
                status: 400,
                message: "User not found"
            });
        }

        // Get all jobs created by the user
        const createdJobs = await prisma.job.findMany({
            where: {
                userId
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Successfully fetched created jobs",
            createdJobs
        });
    }
    catch(err){
        console.log(err)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
    finally{
        await prisma.$disconnect()
    }
}