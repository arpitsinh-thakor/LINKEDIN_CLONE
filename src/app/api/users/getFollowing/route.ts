import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export  async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json();
        const userId = Number(reqBody.userId);
        
        //form userId's following extract theri details
        const following = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select:{
                following:{
                    select:{
                        following:{
                            select:{
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        });


        return NextResponse.json({
            status: 200,
            message: "Following",
            following: following,
            userId
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
    