import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export  async function POST(req: NextRequest){
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
            console.log("User does not exist");
            return NextResponse.json({
                status: 404,
                message: "User does not exist"
            });
        }

        //get following list of users along with name
        const following = await prisma.user.findMany({
            where: {
                followers: {
                    some: {
                        id: userId
                    }
                },
            },
            select: {
                id: true,
                name: true
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Following",
            following: following
        });

    }catch(err){
        console.log(err);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }finally{
        await prisma.$disconnect();
    }
}
    