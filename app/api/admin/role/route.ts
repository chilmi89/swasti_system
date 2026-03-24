import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

/**
 * CRUD API for Role Management
 * Aligned with model: { id: Int, name: String }
 */

// GET /api/admin/role - Fetch all roles
export async function GET() {
    try {
        const roles = await prisma.role.findMany({
            orderBy: { id: 'asc' }
        });
        return NextResponse.json(roles);
    } catch (error) {
        console.error("GET Roles error:", error);
        return NextResponse.json({ error: "Gagal mengambil data role" }, { status: 500 });
    }
}

// POST /api/admin/role - Create new role
export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        
        if (!name || name.trim() === "") {
            return NextResponse.json({ error: "Nama role mandatory" }, { status: 400 });
        }

        const newRole = await prisma.role.create({
            data: { 
                name: name.trim().toUpperCase()
            }
        });
        
        return NextResponse.json(newRole, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Role dengan nama tersebut sudah ada" }, { status: 409 });
        }
        console.error("POST Role error:", error);
        return NextResponse.json({ error: "Gagal membuat role" }, { status: 500 });
    }
}

// PUT /api/admin/role - Update role name
export async function PUT(req: Request) {
    try {
        const { id, name } = await req.json();
        
        if (!id) return NextResponse.json({ error: "ID role diperlukan" }, { status: 400 });
        if (!name || name.trim() === "") return NextResponse.json({ error: "Nama role tidak boleh kosong" }, { status: 400 });

        const updatedRole = await prisma.role.update({
            where: { id: Number(id) },
            data: { 
                name: name.trim().toUpperCase()
            }
        });
        
        return NextResponse.json(updatedRole);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Nama role sudah digunakan" }, { status: 409 });
        }
        console.error("PUT Role error:", error);
        return NextResponse.json({ error: "Gagal memperbarui role" }, { status: 500 });
    }
}

// DELETE /api/admin/role - Remove a role
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Query param 'id' diperlukan" }, { status: 400 });

        await prisma.role.delete({
            where: { id: Number(id) }
        });
        
        return NextResponse.json({ message: "Role berhasil dihapus" });
    } catch (error) {
        console.error("DELETE Role error:", error);
        return NextResponse.json({ error: "Gagal menghapus role. Pastikan role tidak sedang digunakan oleh user lain." }, { status: 500 });
    }
}
