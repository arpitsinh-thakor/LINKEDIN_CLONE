import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest){
    const prisma = new PrismaClient();
    try{
        const reqBody = await req.json();
        console.log(reqBody);
        const userId = Number(reqBody.userId);
        const followerId = Number(reqBody.followerId);
        console.log(userId, followerId);

        const isSameUser = userId === followerId;
        if(isSameUser){
            console.log("Cannot follow self");
            return NextResponse.json({
                status: 400,
                message: "Cannot follow self"
            });
        }

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


        const follower = await prisma.user.findUnique({
            where: {
                id: followerId
            }
        });

        if(!follower){
            console.log("Follower does not exist");
            return NextResponse.json({
                status: 404,
                message: "Follower does not exist"
            });
        }

        //check if user is already following
        const isFollowing = await prisma.following.findFirst({
            where: {
                followingId: userId,
                followerId: followerId
            }
        });


        if(isFollowing){
            console.log("Already following");
            return NextResponse.json({
                status: 400,
                message: "Already following"
            });
        }

        //create following
        await prisma.following.create({
            data: {
                followingId: userId,
                followerId: followerId
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Following",
            followerId,
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