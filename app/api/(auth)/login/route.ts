import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    console.log("LOGIN_API: Started POST request");
    try {
        const body = await req.json();
        const { email, password } = body;
        console.log(`LOGIN_API: Attempting login for email: ${email}`);

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Look up the user by email
        console.log("LOGIN_API: Querying Prisma...");
        const user = await prisma.user.findUnique({
            where: { email },
            include: { Role: true }
        });
        console.log(`LOGIN_API: User found: ${user ? 'YES' : 'NO'}`);

        if (!user || !user.password) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify the provided password with the stored hash
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                role: user.Role?.name || null 
            },
            process.env.JWT_SECRET || 'swasti-fallback-jwt-secret-key', // Set this in .env
            { expiresIn: '1d' }
        );

        const roleName = user.Role?.name?.toUpperCase() || '';
        let redirectUrl = '/dashboard';
        if (roleName === 'ADMIN') redirectUrl = '/admin/dashboard';
        else if (roleName === 'PEMERINTAH') redirectUrl = '/pemerintah/dashboard';
        else if (roleName === 'PETANI') redirectUrl = '/petani/dashboard';

        // Prepare the success response
        const response = NextResponse.json({
            message: "Login successful",
            redirectUrl,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.Role?.name || null,
            }
        }, { status: 200 });

        // Set the token securely in an HTTP-only cookie
        response.cookies.set({
            name: 'session_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;

    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
