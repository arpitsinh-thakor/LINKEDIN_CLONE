import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function GET(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const jobs = await prisma.job.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Jobs found",
            jobs
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