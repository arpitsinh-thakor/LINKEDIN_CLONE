import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const userId = Number(reqBody.userId);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                currentCompany: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                    },

                },
                followers: {
                    select:{
                        follower :{
                            select:{
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                following: {
                    select:{
                        following:{
                            select:{
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                applications: {
                    select:{
                        job:{
                            select:{
                                id: true,
                                title: true,
                                description: true,
                                location: true,
                                company: true,
                                salary: true,
                            }
                        },
                        status: true,
                    }
                }
            }
        });

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({
                status: 404,
                message: "User does not exist"
            });
        }

        return NextResponse.json({
            message: "User found",
            user
        });
    } 
    catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "Error getting users"
        });
    } 
    finally {
        await prisma.$disconnect();
    }
}