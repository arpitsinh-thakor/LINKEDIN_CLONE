import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json()
        const { applicantId } = reqBody
        if(!applicantId){
            return NextResponse.json({
                status: 400,
                message: "Bad Request: Missing required fields."
            })
        }
        //check already approved
        const applicantExists= await prisma.application.findUnique({
            where: {
                id: applicantId
            },
            select: {
                status: true
            },
        })
        if(applicantExists?.status == 'approved'){
            return NextResponse.json({
                status: 400,
                message: "Bad Request: Applicant already approved."
            })
        }

        const applicant = await prisma.application.update({
            where: {
                id: applicantId
            },
            data: {
                status: "approved"
            }
        })

        return NextResponse.json({
            status: 200,
            message: "Applicant approved successfully.",
            data: applicant
        })
    }
    catch(err){
        console.error(err)
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error: Could not approve applicant."
        })
    }
    finally{
        await prisma.$disconnect()
    }
}