import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 }
            );
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = crypto.randomUUID();

        // Create the new user
        const user = await prisma.user.create({
            data: {
                id,
                name,
                email,
                password: hashedPassword,
                // Defaulting to general user role if needed, or null based on your workflow.
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
                createdAt: true,
            }
        });

        return NextResponse.json(
            { message: "Registration successful", user },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Register Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
