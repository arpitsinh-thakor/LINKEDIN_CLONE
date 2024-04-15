import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        
        const posts = await prisma.post.findMany({
            // where: { published: true },
              include: {
                author: {
                  select: { name: true },
                },
                comments: {
                  select: { text: true, author: { select: { name: true } } },
                }
              },
            });
        console.log(posts);
        return NextResponse.json({ status:200 , message: "Posts fetched successfully", data: posts });
    }    
    catch (err) {
        console.log(err);
        return NextResponse.json({status:400, message: "Error fetching posts" });
    } 
    finally {
        await prisma.$disconnect();
    }
}