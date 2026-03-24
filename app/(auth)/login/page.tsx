"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-white rounded-[24px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] p-8 sm:p-10 w-full border border-slate-50">
            <div className="text-center mb-8">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1">Selamat Datang</h1>
                <p className="text-xs text-slate-400 font-medium">Masuk ke SWASTI Analytical Sanctum</p>
            </div>

            <form className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Alamat Email
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a368d] transition-colors">
                            <Mail size={16} />
                        </div>
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            className="w-full bg-[#f8fbff] border border-slate-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-[#1a368d]/30 focus:ring-4 focus:ring-[#1a368d]/5 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Kata Sandi
                        </label>
                        <Link href="#" className="text-[10px] font-bold text-[#1a368d] uppercase tracking-widest hover:underline">
                            Lupa Password?
                        </Link>
                    </div>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a368d] transition-colors">
                            <Lock size={16} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#f8fbff] border border-slate-100 rounded-xl py-3.5 pl-11 pr-11 text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-[#1a368d]/30 focus:ring-4 focus:ring-[#1a368d]/5 transition-all outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400 transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Login Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-[#1a368d] hover:bg-[#152a6d] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#1a368d]/20 flex items-center justify-center gap-2 group transition-all"
                    >
                        <span>Masuk</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <p className="text-[13px] font-medium text-slate-400">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-[#1a368d] font-bold hover:underline">
                        Daftar
                    </Link>
                </p>
            </div>
        </div>
    );
}
