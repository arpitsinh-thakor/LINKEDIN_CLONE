import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try {
        const reqBody = await req.json()
        const { comment, authorId, postId } = reqBody
        console.log(reqBody)

        const commentObj = await prisma.comment.create({
            data: {
                text: comment,
                authorId,
                postId
            }
        })
        console.log(commentObj)

        return NextResponse.json({ message: "Comment created successfully", data: reqBody })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error creating comment" })
    }
    finally {
        await prisma.$disconnect()
    }
}