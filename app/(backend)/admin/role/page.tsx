"use client";

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Search, 
    X,
    Loader2,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

type Role = {
    id: number;
    name: string;
};

export default function RoleManagementPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [currentRole, setCurrentRole] = useState<Partial<Role>>({ name: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/role');
            if (!res.ok) throw new Error("Gagal mengambil data");
            const data = await res.json();
            setRoles(Array.isArray(data) ? data : []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setModalMode('create');
        setCurrentRole({ name: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (role: Role) => {
        setModalMode('edit');
        setCurrentRole(role);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this role?")) return;
        
        try {
            const res = await fetch(`/api/admin/role?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Role deleted successfully");
                fetchRoles();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete role");
            }
        } catch (error) {
            toast.error("An error occurred during deletion");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const res = await fetch('/api/admin/role', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: currentRole.id,
                    name: currentRole.name?.toUpperCase().trim()
                })
            });
            
            if (res.ok) {
                toast.success(modalMode === 'create' ? "Role created successfully" : "Role updated successfully");
                setIsModalOpen(false);
                fetchRoles();
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to save role");
            }
        } catch (error) {
            toast.error("Network error: Failed to reach server");
        } finally {
            setIsSaving(false);
        }
    };

    const filteredRoles = roles.filter(role => 
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-7xl pb-10 bg-white min-h-screen">
            {/* Breadcrumb Section */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0 pt-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Roles Master Data
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><span className="font-medium text-slate-400">Dashboard /</span></li>
                        <li className="font-medium text-[#3C50E0]">Roles</li>
                    </ol>
                </nav>
            </div>

            {/* Integrated Table Card - Forced White Background */}
            <div className="rounded-sm border border-[#E2E8F0] bg-white shadow-sm overflow-hidden mx-4 sm:mx-0">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4 border-b border-[#E2E8F0] bg-white">
                    <div className="relative w-full max-w-sm">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Type to filter..."
                            className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 pl-11 pr-4 text-black outline-none focus:border-[#3C50E0]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={fetchRoles}
                            className="flex items-center justify-center rounded-md border border-[#E2E8F0] p-3 text-slate-500 hover:text-[#3C50E0] transition-colors bg-white"
                        >
                            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={handleOpenCreate}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center rounded-md bg-[#3C50E0] py-3 px-8 text-center font-medium text-white hover:bg-opacity-90"
                        >
                            <Plus size={18} className="mr-2" strokeWidth={3} />
                            Add Role
                        </button>
                    </div>
                </div>

                {/* Table Layout */}
                <div className="max-w-full overflow-x-auto bg-white">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-white border-b border-[#E2E8F0] text-left">
                                <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-900">
                                    UID
                                </th>
                                <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-900">
                                    Role Identity
                                </th>
                                <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-900 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] font-medium bg-white">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="py-24 text-center bg-white">
                                        <Loader2 className="animate-spin mx-auto text-[#3C50E0]" size={32} />
                                        <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Loading Data...</p>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={3} className="py-12 text-center text-red-500 font-bold text-xs uppercase bg-white">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredRoles.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-20 text-center text-slate-400 bg-white">
                                        No entries found matching your filter.
                                    </td>
                                </tr>
                            ) : filteredRoles.map((role, key) => (
                                <tr key={key} className="hover:bg-slate-50 transition-colors bg-white">
                                    <td className="py-5 px-6">
                                        <span className="text-xs font-mono text-slate-400">#{role.id.toString().padStart(4, '0')}</span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="font-bold text-slate-900 uppercase tracking-tight">
                                            {role.name}
                                        </p>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3 font-medium text-slate-400">
                                            <button 
                                                onClick={() => handleOpenEdit(role)}
                                                className="hover:text-[#3C50E0] transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(role.id)}
                                                className="hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Aligned White Background */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-[480px] rounded-sm bg-white p-10 shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-6 top-6 text-slate-400 hover:text-black"
                            >
                                <X size={20} />
                            </button>
                            
                            <h3 className="mb-8 text-xl font-bold text-slate-900">
                                {modalMode === 'create' ? 'Create Role' : 'Update Role'}
                            </h3>
                            
                            <form onSubmit={handleSave} className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-500 tracking-wider">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="E.g. ADMIN"
                                        className="w-full rounded-sm border border-[#E2E8F0] bg-white py-3 px-5 text-black outline-none transition focus:border-[#3C50E0]"
                                        value={currentRole.name}
                                        onChange={(e) => setCurrentRole({...currentRole, name: e.target.value.toUpperCase()})}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 rounded-sm border border-[#E2E8F0] p-3 font-medium text-slate-700 hover:bg-slate-50 bg-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 rounded-sm bg-[#3C50E0] p-3 font-medium text-white transition hover:bg-opacity-90 shadow-md"
                                    >
                                        {isSaving ? "Saving..." : (modalMode === 'create' ? "Save" : "Update")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}