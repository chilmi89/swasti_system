import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/users - Fetch all users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: { Role: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error("GET Users error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// POST /api/admin/users - Create new user
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, roleId } = body;

        if (!email || email.trim() === "") {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const id = crypto.randomUUID();

        const newUser = await prisma.user.create({
            data: {
                id,
                email: email.trim(),
                name: name ? name.trim() : null,
                password: password || null, // Note: Consider hashing password before saving
                roleId: roleId ? Number(roleId) : null,
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }
        console.error("POST User error:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

// PUT /api/admin/users - Update an existing user
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, name, email, password, roleId } = body;

        if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        if (!email || email.trim() === "") return NextResponse.json({ error: "Email is required" }, { status: 400 });

        const updateData: any = {
            email: email.trim(),
            name: name ? name.trim() : null,
            roleId: roleId ? Number(roleId) : null,
        };

        if (password && password.trim() !== "") {
            // Note: Consider hashing password before saving
            updateData.password = password;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Email already taken by another user" }, { status: 409 });
        }
        console.error("PUT User error:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

// DELETE /api/admin/users - Delete a user
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Query param 'id' is required" }, { status: 400 });

        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("DELETE User error:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}