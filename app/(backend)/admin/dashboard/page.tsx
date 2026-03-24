"use client";

import React from 'react';
import { Card } from '../../_components/ui/Card';
import { Button } from '../../_components/ui/Button';
import { TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';
import { LayoutDashboard, Activity as ActivityIcon } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-none">
                        <span className="inline-block not-italic">Admin</span> <span className="text-[#3C50E0]">Dashboard</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1 text-xs">Monitoring system SWASTI secara real-time.</p>
                </div>
                <div className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-lg shadow-slate-200 cursor-default flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    System Active
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Active Price Feeds', value: '458', icon: ActivityIcon, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                    { label: 'Market Transactions', value: '89,120', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50/50' },
                    { label: 'Inflasi Index', value: '5.2%', icon: TrendingUp, color: 'text-red-600', bg: 'bg-red-50/50' },
                ].map((item, i) => (
                    <Card key={i} className="p-5 hover:scale-[1.01] transition-all duration-300 shadow-sm border-slate-100 hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{item.label}</div>
                            <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center transition-transform`}>
                                <item.icon size={16} />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{item.value}</div>
                        <div className="text-[10px] items-center flex gap-1 text-emerald-600 font-bold">
                            <TrendingUp size={12} /> <span className="text-emerald-500">+2.4%</span>
                            <span className="text-slate-400 font-medium ml-1">since last month</span>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-12 flex items-center justify-center relative overflow-hidden group min-h-[400px] border-slate-200 rounded-2xl shadow-xl shadow-slate-100">
                <div className="text-center space-y-8 relative z-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-700 shadow-2xl shadow-slate-200">
                        <ActivityIcon className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-slate-900 font-black text-6xl mb-3 tracking-tighter select-none leading-none">SWASTI</div>
                        <p className="text-slate-400 font-bold max-w-sm mx-auto leading-relaxed text-[9px] uppercase tracking-widest">Sistem Integrasi Data Utama Nasional</p>
                    </div>
                    <Button variant="primary" className="px-10 py-5 text-sm rounded-xl">
                        Update Data Report
                    </Button>
                </div>
            </Card>
        </div>
    );
}