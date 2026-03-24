"use client";

import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-40 flex w-full bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] drop-shadow-sm font-sans">
            <div className="flex flex-grow items-center justify-between px-4 py-3 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-50 block rounded-md border border-slate-200 bg-white p-2 shadow-sm lg:hidden hover:bg-slate-50 transition-colors"
                    >
                        <Menu size={18} className="text-[#64748B]" />
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}
                </div>

                <div className="hidden sm:block">
                    <form action="#" method="POST">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <Search size={16} className="text-[#64748B]" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-full bg-transparent pl-7 pr-4 font-medium focus:outline-none xl:w-125 text-sm text-slate-600"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-4">
                    <ul className="flex items-center gap-2">
                        {/* <!-- Notification Menu Area --> */}
                        <li>
                            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                                <Bell size={18} className="text-slate-500" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                            </button>
                        </li>
                    </ul>

                    {/* <!-- User Area --> */}
                    <div className="relative flex items-center gap-3 pl-2 border-l border-slate-100">
                        <div className="flex flex-col items-end">
                            <span className="hidden text-sm font-bold text-slate-800 lg:block leading-tight">Admin SWASTI</span>
                            <span className="hidden text-[10px] text-emerald-500 font-semibold lg:block leading-tight uppercase tracking-wider">Systems Admin</span>
                        </div>
                        <div className="h-9 w-9 rounded-full border border-slate-200 bg-[#F1F5F9] flex items-center justify-center shadow-inner overflow-hidden">
                            <User size={18} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
