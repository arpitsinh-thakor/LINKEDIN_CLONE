import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json();
        const {userId, jobId} = reqBody;


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

        const job = await prisma.job.findUnique({
            where: {
                id: jobId
            }
        });

        if(!job){
            return NextResponse.json({
                status: 400,
                message: "Job not found"
            });
        }

        if(job.userId === userId){
            return NextResponse.json({
                status: 400,
                message: "User cannot apply for their own job"
            });
        }

        //check if user has already applied for the job
        const applicationExists = await prisma.application.findFirst({
            where: {
                userId: userId,
                jobId: jobId,
            },

        });

        if(applicationExists){
            return NextResponse.json({
                status: 400,
                message: "User has already applied for the job"
            });
        }
        

        const application = await prisma.application.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                job: {
                    connect: {
                        id: jobId
                    }
                },
                status: "pending"
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Applied for job successfully",
            application
        });

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            status: 500,
            message: "Error while applying for job"
        });
    }
    finally{
        await prisma.$disconnect();
    }
}