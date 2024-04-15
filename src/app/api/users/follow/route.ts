import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json();
        const userId = Number(reqBody.userId);
        const followId = Number(reqBody.followId);

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

        const followUser = await prisma.user.findUnique({
            where: {
                id: followId
            }
        });

        if(!followUser){
            console.log("User to follow does not exist");
            return NextResponse.json({
                status: 404,
                message: "User to follow does not exist"
            });
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                following: {
                    connectOrCreate:{
                        where: {
                            id: followId
                        },
                        create: {
                            id: followId
                        }
                    }
                }
            }
        });

        await prisma.user.update({
            where: {
                id: followId
            },
            data: {
                followers: {
                    connectOrCreate:{
                        where: {
                            id: userId
                        },
                        create: {
                            id: userId
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            message: "User followed"
        });


    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Error following user"
        });
    }
    finally{
        await prisma.$disconnect();
    }
}