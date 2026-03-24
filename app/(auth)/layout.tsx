import type { Metadata } from "next";
import React from 'react';
import Link from 'next/link';
import { Globe, HelpCircle, Shield, Info } from 'lucide-react';
import { Geist, Geist_Mono } from "next/font/google";
import "../(frontend)/layouts/globals.css";

const geistSans = Geist({
    variable: "--font-font-sans", // Use the variable name expected in globals.css if any, or just for font-family
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SWASTI | Authentication",
    description: "Masuk ke SWASTI Analytical Sanctum",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-[#1a368d] selection:text-white">
                    {/* Header */}
                    <header className="px-8 py-6 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold tracking-tight text-[#1a368d]">SWASTI</span>
                        </Link>
                        <div className="flex items-center gap-4 text-slate-400">
                            <button className="hover:text-[#1a368d] transition-colors cursor-pointer p-1" suppressHydrationWarning>
                                <Globe size={20} />
                            </button>
                            <button className="hover:text-[#1a368d] transition-colors cursor-pointer p-1" suppressHydrationWarning>
                                <HelpCircle size={20} />
                            </button>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col items-center justify-center -mt-12 px-4">
                        <div className="w-full max-w-md">
                            {children}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex items-center justify-center gap-8 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                            <div className="flex items-center gap-2">
                                <Shield size={12} className="stroke-[3px]" />
                                <span>Enkripsi AES-256</span>
                            </div>
                            <div className="w-[1px] h-3 bg-slate-200" />
                            <div className="flex items-center gap-2">
                                <Shield size={12} className="stroke-[3px] fill-slate-300/20" />
                                <span>ISO 27001 Terverifikasi</span>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="border-t border-slate-100 py-8 px-12 mt-auto">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6 order-3 md:order-1">
                                <span className="text-xl font-bold text-[#1a368d]">SWASTI</span>
                            </div>
                            
                            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider order-2">
                                © 2024 SWASTI ANALYTICAL SANCTUM. HAK CIPTA DILINDUNGI.
                            </div>

                            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider order-1 md:order-3">
                                <Link href="#" className="hover:text-[#1a368d] transition-colors">Syarat & Ketentuan</Link>
                                <Link href="#" className="hover:text-[#1a368d] transition-colors">Kebijakan Privasi</Link>
                                <Link href="#" className="hover:text-[#1a368d] transition-colors">Pusat Bantuan</Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
