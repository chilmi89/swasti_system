"use client";

import React from 'react';
import { 
    AlertTriangle, 
    Bell, 
    ArrowLeft, 
    MapPin, 
    ShieldCheck, 
    Info, 
    ChevronRight,
    Wind,
    Droplets,
    CloudRainWind,
    CircleCheck,
    CloudAlert,
    ThermometerSun,
    CalendarSearch
} from 'lucide-react';
import { Button } from '../../_components/ui/Button';
import { Card } from '../../_components/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RisikoWilayahPetani() {
    const risks = [
        { title: 'Inflasi Cabai', status: 'Waspada', level: 'HIGH', info: 'Harga melambung di jatim' },
        { title: 'Ketersediaan Beras', status: 'Aman', level: 'LOW', info: 'Stok Bulog mencukupi' },
        { title: 'Wabah OPT', status: 'Risiko Rendah', level: 'LOW', info: 'Suhu stabil untuk padi' },
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
                        Status <span className="text-slate-300">Risiko Wilayah</span>
                    </h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">
                        Deteksi Dini Inflasi & Keamanan Pangan Lokal
                    </p>
                </div>
                <div className="bg-red-50 px-6 py-4 rounded-2xl flex items-center gap-4 text-red-600 shadow-lg shadow-red-50 border border-red-100">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
                        <Bell size={20} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase text-red-400 tracking-widest leading-none mb-1">Peringatan Aktif</p>
                        <p className="text-xs font-black tracking-tight leading-none uppercase italic">Kenaikan Harga Cabai (Kediri)</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Risk Status Area */}
                <div className="lg:col-span-2 space-y-8">
                     <Card className="p-10 border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden relative">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="relative shrink-0">
                                <div className="w-48 h-48 rounded-full border-[12px] border-slate-100 border-t-amber-400 flex flex-col items-center justify-center">
                                    <p className="text-4xl font-black tracking-tighter">WASPADA</p>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mt-2">Level Risiko</span>
                                </div>
                                <div className="absolute top-0 right-0 p-3 bg-amber-400 text-white rounded-full shadow-lg shadow-amber-200">
                                    <AlertTriangle size={24} />
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">Analisis <span className="text-slate-300">Minggu Ini</span></h3>
                                <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6">
                                    Wilayah Anda terdeteksi pada level <span className="text-amber-500 underline decoration-amber-200 underline-offset-4">WASPADA (Level 2)</span>. Hal ini dipicu oleh kenaikan harga bahan baku logistik dan volatilitas harga cabai di pasaran Jatim.
                                </p>
                                <div className="flex gap-3">
                                    <Button size="sm" className="rounded-xl px-6 bg-slate-900 text-white hover:bg-black font-black text-[10px] uppercase py-4">Lihat Laporan Lengkap</Button>
                                    <Button variant="outline" size="sm" className="rounded-xl px-6 border-slate-200 font-black text-[10px] uppercase py-4">Panduan Mitigasi</Button>
                                </div>
                            </div>
                        </div>
                     </Card>

                    {/* Risk Indicators Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {risks.map((risk, i) => (
                            <Card key={i} className="p-6 border-slate-200 shadow-sm rounded-2xl bg-white group hover:scale-[1.02] transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${risk.level === 'HIGH' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        {risk.level === 'HIGH' ? <AlertTriangle size={16} /> : <CircleCheck size={16} />}
                                    </div>
                                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{risk.title}</p>
                                </div>
                                <p className={`text-xl font-black tracking-tighter ${risk.level === 'HIGH' ? 'text-amber-500' : 'text-emerald-500'} mb-1`}>{risk.status}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">{risk.info}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar Info - Climate & External Factors */}
                <aside className="space-y-8">
                     <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-slate-50 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                            <CloudRainWind size={120} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none mb-6 relative z-10">Kondisi <span className="text-slate-300">Eksternal</span></h4>
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-6 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                    <ThermometerSun size={20} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-bold">Temperatur Tanah</p>
                                    <p className="text-base font-black text-slate-900 uppercase tracking-tight">28.5°C (Stabil)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                    <CloudAlert size={20} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-bold">Curah Hujan</p>
                                    <p className="text-base font-black text-slate-900 uppercase tracking-tight">Kering (Potensi Hama)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                    <Wind size={20} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-bold">Kecepatan Angin</p>
                                    <p className="text-base font-black text-slate-900 uppercase tracking-tight">8 Km/h (Aman)</p>
                                </div>
                            </div>
                        </div>
                     </Card>

                    <Card className="p-8 bg-slate-900 border-none rounded-2xl text-white">
                        <h4 className="text-lg font-black tracking-tight uppercase leading-none mb-4">Informasi <span className="text-white/30">Bantuan</span></h4>
                        <p className="text-xs text-white/40 leading-relaxed font-bold mb-6">Punya pertanyaan atau butuh verifikasi data? Hubungi tim pendamping wilayah Anda.</p>
                        <Button className="w-full rounded-xl py-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold uppercase text-[10px] tracking-widest">
                            Hubungi Tim Lapangan
                        </Button>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
