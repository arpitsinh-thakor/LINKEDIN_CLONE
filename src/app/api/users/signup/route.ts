import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const { name, email, password} = reqBody;
        console.log(reqBody);
        const hashedPassword = await getHashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        console.log(user);
        return NextResponse.json({
                    message: "User created successfully",
                    data: reqBody
                });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
        message: "Error creating user"
        });
    } finally {
        await prisma.$disconnect();
    }
}

async function getHashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}