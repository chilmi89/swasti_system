"use client";

import React from 'react';
import { 
    TrendingUp, 
    Calendar, 
    ArrowLeft, 
    Filter, 
    Download, 
    ChevronRight,
    Search,
    Target
} from 'lucide-react';
import { Button } from '../../_components/ui/Button';
import { Card } from '../../_components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Link from 'next/link';

const data = [
    { name: 'Jan', price: 12000 },
    { name: 'Feb', price: 13500 },
    { name: 'Mar', price: 14200 },
    { name: 'Apr', price: 13800 },
    { name: 'Mei', price: 15000 },
    { name: 'Jun', price: 16500 },
    { name: 'Jul', price: 15800 },
];

export default function TrenHargaPetani() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {/* Nav & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <Link href="/petani" className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors mb-4 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Kembali Ke Dasbor
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Analisis <span className="text-slate-300">Tren Harga</span>
                    </h1>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">
                        Data Historis Komoditas Pangan Strategis Nasional (6 Bulan Terakhir)
                    </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-initial rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest flex items-center gap-3 py-5">
                        <Filter size={16} />
                        Filter Data
                    </Button>
                    <Button className="flex-1 md:flex-initial rounded-xl bg-slate-900 text-white hover:bg-black font-black text-[10px] uppercase tracking-widest flex items-center gap-3 py-5">
                        <Download size={16} />
                        Ekspor PDF
                    </Button>
                </div>
            </div>

            {/* Main Interactive Chart */}
            <Card className="p-10 border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden relative">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Komoditas Terpilih</p>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                            Beras Medium
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-lg">IDP #13002</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimasi Kenaikan</p>
                        <p className="text-3xl font-black text-emerald-500 tracking-tighter leading-none">+37.5%</p>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#cbd5e1" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fontWeight: 800, fill: '#64748b' }}
                            />
                            <YAxis 
                                stroke="#cbd5e1" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(value) => `Rp${value}`}
                                tick={{ fontWeight: 800, fill: '#64748b' }}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#0f172a', 
                                    border: 'none', 
                                    borderRadius: '16px',
                                    padding: '16px',
                                    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.5)'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}
                                labelStyle={{ color: '#64748b', fontSize: '10px', marginBottom: '8px', fontWeight: 700 }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#2563eb" 
                                strokeWidth={4}
                                fillOpacity={1} 
                                fill="url(#colorPrice)" 
                                animationDuration={2000}
                                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4, fill: '#2563eb' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* List Of Other Commodities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-white flex items-center justify-between group hover:border-slate-900 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Cabai Merah</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Rp45.000 /kg</p>
                        </div>
                    </div>
                    <Link href="#" className="p-4 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-900 transition-colors">
                        <ChevronRight size={20} />
                    </Link>
                </Card>

                <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-white flex items-center justify-between group hover:border-slate-900 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Bawang Merah</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Rp32.000 /kg</p>
                        </div>
                    </div>
                    <Link href="#" className="p-4 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-900 transition-colors">
                        <ChevronRight size={20} />
                    </Link>
                </Card>
            </div>
        </div>
    );
}
