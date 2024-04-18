import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{

        const reqBody = await req.json();
        console.log(reqBody);
        const { userId, title, description, company, location, salary } = reqBody;

        const job = await prisma.job.create({
            data:{
                title,
                description,
                company,
                location,
                salary: Number(salary),
                user: {
                    connect: {
                        id: Number(userId)
                    }
                }
            }
        })

        return NextResponse.json({
            status: 200,
            message: "Job created successfully",
            job
        });

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Error in creating job"
        });
    }
    finally{
        await prisma.$disconnect();
    }
}