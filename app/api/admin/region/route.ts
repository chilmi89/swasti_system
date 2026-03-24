import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

/**
 * CRUD API for Region Management
 * Aligned with model: { id: Int, name: String, type: String }
 */

// GET /api/admin/region - Fetch all regions
export async function GET() {
    try {
        const regions = await prisma.region.findMany({
            orderBy: { id: 'asc' }
        });
        return NextResponse.json(regions);
    } catch (error) {
        console.error("GET Regions error:", error);
        return NextResponse.json({ error: "Gagal mengambil data wilayah" }, { status: 500 });
    }
}

// POST /api/admin/region - Create new region
export async function POST(req: Request) {
    try {
        const { id, name, type } = await req.json();
        
        if (!id) return NextResponse.json({ error: "ID (Kode Wilayah) mandatory" }, { status: 400 });
        if (!name || name.trim() === "") return NextResponse.json({ error: "Nama wilayah mandatory" }, { status: 400 });

        const newRegion = await prisma.region.create({
            data: { 
                id: Number(id),
                name: name.trim().toUpperCase(),
                type: type || "PROVINCE"
            }
        });
        
        return NextResponse.json(newRegion, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Wilayah dengan ID atau Nama tersebut sudah ada" }, { status: 409 });
        }
        console.error("POST Region error:", error);
        return NextResponse.json({ error: "Gagal membuat data wilayah" }, { status: 500 });
    }
}

// PUT /api/admin/region - Update region
export async function PUT(req: Request) {
    try {
        const { id, name, type } = await req.json();
        
        if (!id) return NextResponse.json({ error: "ID wilayah diperlukan" }, { status: 400 });
        if (!name || name.trim() === "") return NextResponse.json({ error: "Nama wilayah tidak boleh kosong" }, { status: 400 });

        const updatedRegion = await prisma.region.update({
            where: { id: Number(id) },
            data: { 
                name: name.trim().toUpperCase(),
                type: type || "PROVINCE"
            }
        });
        
        return NextResponse.json(updatedRegion);
    } catch (error: any) {
        console.error("PUT Region error:", error);
        return NextResponse.json({ error: "Gagal memperbarui data wilayah" }, { status: 500 });
    }
}

// DELETE /api/admin/region - Remove a region
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Query param 'id' diperlukan" }, { status: 400 });

        await prisma.region.delete({
            where: { id: Number(id) }
        });
        
        return NextResponse.json({ message: "Wilayah berhasil dihapus" });
    } catch (error) {
        console.error("DELETE Region error:", error);
        return NextResponse.json({ error: "Gagal menghapus wilayah. Pastikan data tidak sedang digunakan." }, { status: 500 });
    }
}
