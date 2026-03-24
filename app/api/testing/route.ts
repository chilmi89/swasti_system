import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Perform a simple heartbeat query
        const userCount = await prisma.user.count();
        
        return NextResponse.json({
            status: 'success',
            message: 'Koneksi database berhasil!',
            data: {
                userCount,
                timestamp: new Date().toISOString(),
                database: 'Supabase (PostgreSQL)',
                orm: 'Prisma v6'
            }
        });
    } catch (error: any) {
        console.error('Database connection error:', error);
        
        return NextResponse.json({
            status: 'error',
            message: 'Gagal menyambungkan ke database.',
            error: error.message || 'Error tidak diketahui',
            details: {
                code: error.code,
                meta: error.meta
            }
        }, { status: 500 });
    }
}
