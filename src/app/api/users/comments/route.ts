import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try {
        const reqBody = await req.json()
        const { postId } = reqBody

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                comments: {
                    select: {
                        text: true,
                    }
                }
            }
        })
        console.log(post)
        console.log(postId +  " -> " + post?.comments)

        return NextResponse.json({ message: "Comment created successfully", data: post?.comments})
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error creating comment" })
    }
    finally {
        await prisma.$disconnect()
    }
}