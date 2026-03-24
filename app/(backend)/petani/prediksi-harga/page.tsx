"use client";

import React from 'react';
import { 
    CalendarSearch, 
    Zap, 
    ArrowLeft, 
    Target, 
    Lightbulb, 
    LineChart as ChartIcon, 
    ShieldCheck, 
    ArrowUpRight,
    ArrowDownRight,
    BrainCircuit,
    Info,
    ChevronRight
} from 'lucide-react';
import { Button } from '../../_components/ui/Button';
import { Card } from '../../_components/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrediksiHargaPetani() {
    const predictions = [
        { month: 'Mei 2024', est: '16.500', certainty: '92%', trend: 'up' },
        { month: 'Jun 2024', est: '17.200', certainty: '85%', trend: 'up' },
        { month: 'Jul 2024', est: '15.800', certainty: '78%', trend: 'down' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <Link href="/petani" className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors mb-4 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Kembali Ke Dasbor
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Prediksi <span className="text-slate-300">Harga Panen</span>
                    </h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">
                        Asisten Kecerdasan Buatan SWASTI untuk Strategi Penjualan Anda
                    </p>
                </div>
                <div className="bg-slate-900 px-6 py-4 rounded-2xl flex items-center gap-4 text-white shadow-xl shadow-slate-200 border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <BrainCircuit size={20} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Model Aktif</p>
                        <p className="text-xs font-black tracking-tight leading-none uppercase">Swasti-ML v6.2 (Deep-Price)</p>
                    </div>
                </div>
            </div>

            {/* AI Insight Highlight */}
            <Card className="p-0 border-none rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-2xl shadow-blue-100 relative group">
                <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none duration-1000">
                    <Zap size={300} strokeWidth={1} />
                </div>
                
                <div className="p-12 relative z-10 flex flex-col lg:row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 bg-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">Update Hari Ini</span>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Kab. Kediri - Beras Medium</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-8">
                            Harga diprediksi <span className="text-blue-400 italic">Meningkat</span> Pesat pada Bulan Mei.
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4">
                                <Target className="text-blue-400" size={24} />
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Puncak Harga</p>
                                    <p className="text-xl font-black">Mei - Minggu ke-2</p>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4">
                                <ChartIcon className="text-emerald-400" size={24} />
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Potensi Margin</p>
                                    <p className="text-xl font-black text-emerald-400">+18.4%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="shrink-0">
                         <div className="w-48 h-48 rounded-full border-[12px] border-white/5 border-t-blue-500 flex flex-col items-center justify-center bg-white/5 backdrop-blur-2xl shadow-2xl shadow-blue-500/20">
                            <p className="text-4xl font-black tracking-tighter">92%</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">Akurasi Prediksi</p>
                         </div>
                    </div>
                </div>
            </Card>

            {/* Monthly Breakdown Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2">
                    <Card className="p-0 border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">Proyeksi <span className="text-slate-300">Bulan Ke Depan</span></h3>
                            </div>
                            <Button variant="ghost" className="p-2 h-auto text-slate-400 hover:text-slate-900 transition-colors">
                                <Info size={18} />
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Periode Target</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Estimasi Harga</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Tingkat Keyakinan</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Trend</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {predictions.map((p, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-slate-900 tracking-tight">{p.month}</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Minggu 1-4</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-slate-900 tracking-tight">Rp{p.est}/kg</p>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                                                    <div className="h-full bg-blue-500" style={{ width: p.certainty }} />
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{p.certainty}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${p.trend === 'up' ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
                                                    {p.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {p.trend === 'up' ? 'Naik' : 'Turun'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </main>
                
                <aside className="space-y-8">
                    <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-white">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-6 shadow-lg shadow-amber-50">
                            <Lightbulb size={24} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none mb-4">Tips <span className="text-slate-300">Penjualan</span></h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-bold mb-6">
                            Penundaan panen selama <span className="text-slate-900">10-14 hari</span> dari jadwal rutin Anda pada bulan Mei berpotensi memberikan margin tambahan yang signifikan.
                        </p>
                        <Button variant="outline" className="w-full rounded-xl py-4 border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
                            Lihat Penjelasan Logika
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
