import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function GET(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const users = await prisma.user.findMany();
        return NextResponse.json({
            message: "All users",
            users
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