"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="bg-white rounded-[24px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] p-8 sm:p-10 w-full border border-slate-50">
            <div className="text-center mb-6">
                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1">Daftar Akun</h1>
                <p className="text-xs text-slate-400 font-medium">Bergabung dengan SWASTI Analytical Sanctum</p>
            </div>

            <form className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Nama Lengkap
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a368d] transition-colors">
                            <User size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Contoh: Budi Santoso"
                            className="w-full bg-[#f8fbff] border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-[#1a368d]/30 focus:ring-4 focus:ring-[#1a368d]/5 transition-all outline-none"
                        />
                    </div>
                </div>

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
                            className="w-full bg-[#f8fbff] border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-[#1a368d]/30 focus:ring-4 focus:ring-[#1a368d]/5 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Kata Sandi
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a368d] transition-colors">
                            <Lock size={16} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#f8fbff] border border-slate-100 rounded-xl py-3 pl-11 pr-11 text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-[#1a368d]/30 focus:ring-4 focus:ring-[#1a368d]/5 transition-all outline-none"
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

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Konfirmasi Kata Sandi
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a368d] transition-colors">
                            <Lock size={16} />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#f8fbff] border border-slate-100 rounded-xl py-3 pl-11 pr-11 text-sm font-medium text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-[#1a368d]/30 focus:ring-4 focus:ring-[#1a368d]/5 transition-all outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Register Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-[#1a368d] hover:bg-[#152a6d] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#1a368d]/20 flex items-center justify-center gap-2 group transition-all"
                    >
                        <span>Daftar Sekarang</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-[13px] font-medium text-slate-400">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-[#1a368d] font-bold hover:underline">
                        Masuk
                    </Link>
                </p>
            </div>
        </div>
    );
}
