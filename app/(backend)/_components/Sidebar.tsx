"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    Database, 
    FileText, 
    LogOut, 
    ShieldCheck, 
    Users, 
    BarChart3, 
    Cpu, 
    UserIcon,
    AlertTriangle,
    Map,
    ChevronDown,
    Settings
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

// TailAdmin-inspired groupings for each role
const roleMenus = {
    Admin: [
        {
            group: "MENU",
            items: [
                { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
            ]
        },
        {
            group: "MASTER DATA",
            items: [
                { name: 'Komoditas Master', icon: Database, href: '/admin/komoditas' },
                { name: 'Role Management', icon: ShieldCheck, href: '/admin/role' },
                { name: 'User Management', icon: Users, href: '/admin/users' },
            ]
        },
        {
            group: "ANALYTICS & SYSTEM",
            items: [
                { name: 'Predictive Model', icon: Cpu, href: '/admin/model-prediction' },
                { name: 'Laporan Sistem', icon: FileText, href: '/admin/laporan' },
                { name: 'Settings', icon: Settings, href: '/admin/settings' },
            ]
        }
    ],
    petani: [
        {
            group: "MENU",
            items: [
                { name: 'Overview', icon: LayoutDashboard, href: '/petani/dashboard' },
            ]
        },
        {
            group: "MARKET WATCH",
            items: [
                { name: 'Tren Harga', icon: BarChart3, href: '/petani/tren-harga' },
                { name: 'Prediksi Harga', icon: Cpu, href: '/petani/prediksi-harga' },
            ]
        },
        {
            group: "ENVIRONMENT",
            items: [
                { name: 'Risiko Wilayah', icon: AlertTriangle, href: '/petani/risiko-wilayah' },
            ]
        }
    ],
    pemerintah: [
        {
            group: "MENU",
            items: [
                { name: 'Dashboard', icon: LayoutDashboard, href: '/pemerintah/dashboard' },
            ]
        },
        {
            group: "MONITORING",
            items: [
                { name: 'Analisis Tren', icon: BarChart3, href: '/pemerintah/analisis-tren' },
                { name: 'Peta Risiko', icon: Map, href: '/pemerintah/peta-resiko' },
            ]
        },
        {
            group: "GOVERNANCE",
            items: [
                { name: 'Kebijakan', icon: FileText, href: '/pemerintah/kebijakan' },
            ]
        }
    ]
};

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();
    
    // Determine current role based on path
    const isPath = (role: string) => pathname?.startsWith(`/${role}`) || pathname?.includes(`/${role}/`);
    
    let currentSections = roleMenus.Admin;
    let currentRoleLabel = "Administrator";

    if (isPath('petani')) {
        currentSections = roleMenus.petani;
        currentRoleLabel = "Petani Access";
    } else if (isPath('pemerintah')) {
        currentSections = roleMenus.pemerintah;
        currentRoleLabel = "Pemerintah Access";
    }

    return (
        <aside 
            className={`fixed left-0 top-0 z-9999 flex h-screen w-[290px] flex-col overflow-y-hidden bg-white border-r border-[#E2E8F0] duration-300 ease-linear lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0 transition-transform shadow-2xl lg:shadow-none' : '-translate-x-full transition-transform lg:translate-x-0'
            }`}
        >
            {/* SIDEBAR HEADER */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#3C50E0]">
                        <ShieldCheck className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold text-black dark:text-white">SWASTI</span>
                </Link>

                <button
                    onClick={() => setSidebarOpen(false)}
                    aria-controls="sidebar"
                    className="block lg:hidden text-[#64748B]"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            {/* SIDEBAR MENU */}
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear flex-grow">
                <nav className="mt-2 px-4 py-1 lg:px-6">
                    {currentSections.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="mb-4">
                            <h3 className="mb-2 ml-4 text-[11px] font-semibold text-[#8A99AF] uppercase tracking-wider">
                                {section.group}
                            </h3>

                            <ul className="mb-4 flex flex-col gap-1">
                                {section.items.map((item, itemIdx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={itemIdx}>
                                            <Link
                                                href={item.href}
                                                onClick={() => { if(window.innerWidth < 1024) setSidebarOpen(false); }}
                                                className={cn(
                                                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 text-sm font-medium text-[#64748B] duration-300 ease-in-out hover:bg-[#F1F5F9] dark:hover:bg-meta-4",
                                                    isActive && "bg-[#F1F5F9] text-[#3C50E0] dark:bg-meta-4"
                                                )}
                                            >
                                                <item.icon 
                                                    size={18} 
                                                    className={cn(
                                                        "duration-300",
                                                        isActive ? "text-[#3C50E0]" : "text-[#8A99AF] group-hover:text-[#3C50E0]"
                                                    )} 
                                                />
                                                {item.name}
                                                
                                                {isActive && (
                                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-l-md bg-[#3C50E0]"></span>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            {/* SIDEBAR FOOTER - LOGOUT & USER */}
            <div className="mt-auto px-6 py-6 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-10 w-10 rounded-full border border-[#E2E8F0] flex items-center justify-center bg-[#F8FAFC]">
                        <UserIcon size={20} className="text-[#64748B]" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold text-black truncate w-32">{currentRoleLabel}</span>
                        <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Online
                        </span>
                    </div>
                </div>

                <button className="flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#64748B] duration-300 ease-in-out hover:bg-red-50 hover:text-red-500 group">
                    <LogOut size={18} className="group-hover:text-red-500" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};
