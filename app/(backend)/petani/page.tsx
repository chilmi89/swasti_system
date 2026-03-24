"use client";

import React from 'react';
import { 
    LayoutDashboard, 
    TrendingUp, 
    CalendarCheck, 
    MapPin, 
    AlertCircle, 
    ChevronRight, 
    ArrowUpRight, 
    ArrowDownRight,
    Wheat,
    Sprout,
    CalendarSearch
} from 'lucide-react';
import { Button } from '../_components/ui/Button';
import { Card } from '../_components/ui/Card';
import { motion } from 'framer-motion';

export default function PetaniDashboard() {
    const commodities = [
        { name: 'Beras Medium', price: '14.500', trend: 'up', change: '+2.5%', icon: Wheat },
        { name: 'Cabai Merah', price: '45.000', trend: 'down', change: '-5.2%', icon: Sprout },
        { name: 'Bawang Merah', price: '32.000', trend: 'up', change: '+1.8%', icon: Sprout },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header / Hero */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Halo, <span className="text-slate-300">Dulur Tani</span>
                    </h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">
                        Monitor Harga & Strategi Panen Regional Anda
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 px-6 py-4 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Status Wilayah</p>
                        <p className="text-sm font-black text-slate-900 leading-none">Kab. Kediri, Jawa Timur</p>
                    </div>
                    <div className="ml-4 px-3 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        Aman
                    </div>
                </div>
            </div>

            {/* Quick Stats / Prices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {commodities.map((item, i) => (
                    <Card key={i} className="p-6 border-slate-100 rounded-2xl hover:scale-[1.02] transition-all group shadow-sm bg-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                                <item.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase ${item.trend === 'up' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                {item.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {item.change}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{item.name}</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Rp{item.price}<span className="text-sm text-slate-300 ml-1">/kg</span></p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Harvesting Strategy Card */}
                <Card className="p-0 border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                                <CalendarCheck size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">Rekomendasi <span className="text-slate-300">Waktu Panen</span></h3>
                        </div>
                        <p className="text-xs text-slate-500 font-bold mb-8">Berdasarkan analisis tren dan prediksi harga pasar 3 bulan ke depan.</p>
                        
                        <div className="space-y-4">
                            {[
                                { status: 'Optimal', title: 'Cabai Merah', date: 'Mei - Minggu 2', info: 'Harga diprediksi mencapai puncak' },
                                { status: 'Waspada', title: 'Bawang Merah', date: 'Juni - Minggu 1', info: 'Potensi banjir pasokan di Jatim' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 p-5 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all bg-white shadow-sm">
                                    <div className={`w-2 h-12 rounded-full ${item.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                    <div className="flex-1">
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{item.title}</p>
                                        <p className="text-base font-black text-slate-900 uppercase tracking-tight">{item.date}</p>
                                        <p className="text-[10px] text-slate-400 font-bold">{item.info}</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
                                        Detail
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Regional Risk & Market Info */}
                <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                        <AlertCircle size={200} className="rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-400">
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter uppercase leading-none">Lanskap <span className="text-white/30">Inflasi Lokal</span></h3>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Kab. Kediri & Sekitarnya</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                <p className="text-xs font-bold text-white/60 mb-2">Trend Inflasi Pangan</p>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-4xl font-black tracking-tight leading-none text-red-400">+1.2%</span>
                                    <span className="text-[10px] font-black uppercase text-white/40 mb-1">Mtm (Bulan Lalu: +0.8%)</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '65%' }}
                                        className="h-full bg-red-400" 
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-white/50 leading-relaxed font-medium">
                                Inflasi di wilayah Anda cenderung meningkat pada komoditas <span className="text-white font-bold underline decoration-blue-500">Cabai Rawit</span> dan <span className="text-white font-bold underline decoration-blue-500">Telur Ayam</span>. Disarankan untuk memantau pasokan pakan dan pupuk bersubsidi.
                            </p>
                        </div>
                    </div>

                    <Button className="w-full mt-8 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black py-5 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 relative z-10 shadow-xl shadow-black/20">
                        <span>Peta Risiko Lengkap</span>
                        <ChevronRight size={14} />
                    </Button>
                </Card>
            </div>
        </div>
    );
}
