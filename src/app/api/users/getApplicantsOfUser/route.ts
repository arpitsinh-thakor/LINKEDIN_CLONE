import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const jobId = Number(reqBody.jobId);
        
        const applicants = await prisma.application.findMany({
            where: {
                jobId: jobId
            },
            select: {
                id: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        currentCompany: true
                    }
                }
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Successfully fetched user",
            applicants
        });
    }
    catch(err){
        console.log(err)
        return NextResponse.json({
            status: 500,
            message: "counld not get user's applicants"
        })
    }
    finally{
        await prisma.$disconnect()
    }
}