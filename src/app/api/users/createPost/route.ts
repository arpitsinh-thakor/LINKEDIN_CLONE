import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"


export  async function POST(req: NextRequest) {   
    const prisma = new PrismaClient()
    try{
        const reqBody = await req.json()
        const {title, content, authorId} = reqBody
        console.log(reqBody)

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId
            }
        })
        console.log(post)

        return NextResponse.json({message: "Post created successfully", data: reqBody})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({message: "Error creating post"})
    }
    finally{
        await prisma.$disconnect()
    }
}
    