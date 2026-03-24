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

type User = {
    id: string;
    name: string | null;
    email: string;
    roleId: number | null;
    Role?: Role | null;
};

export default function UsersManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [currentUser, setCurrentUser] = useState<Partial<User & { password?: string }>>({ 
        name: '', email: '', roleId: undefined, password: '' 
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [usersRes, rolesRes] = await Promise.all([
                fetch('/api/admin/users'),
                fetch('/api/admin/role')
            ]);
            
            if (!usersRes.ok) throw new Error("Gagal mengambil data user");
            if (!rolesRes.ok) throw new Error("Gagal mengambil data role");
            
            const usersData = await usersRes.json();
            const rolesData = await rolesRes.json();
            
            setUsers(Array.isArray(usersData) ? usersData : []);
            setRoles(Array.isArray(rolesData) ? rolesData : []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setModalMode('create');
        setCurrentUser({ name: '', email: '', password: '', roleId: undefined });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (user: User) => {
        setModalMode('edit');
        setCurrentUser({ ...user, password: '' });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        
        try {
            const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("User deleted successfully");
                fetchData();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete user");
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
            const payload = {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
                roleId: currentUser.roleId,
                ...(currentUser.password ? { password: currentUser.password } : {})
            };

            const res = await fetch('/api/admin/users', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                toast.success(modalMode === 'create' ? "User created successfully" : "User updated successfully");
                setIsModalOpen(false);
                fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to save user");
            }
        } catch (error) {
            toast.error("Network error: Failed to reach server");
        } finally {
            setIsSaving(false);
        }
    };

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Role?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-7xl pb-10 bg-white min-h-screen">
            {/* Breadcrumb Section */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0 pt-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Users Master Data
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><span className="font-medium text-slate-400">Dashboard /</span></li>
                        <li className="font-medium text-[#3C50E0]">Users</li>
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
                            onClick={fetchData}
                            className="flex items-center justify-center rounded-md border border-[#E2E8F0] p-3 text-slate-500 hover:text-[#3C50E0] transition-colors bg-white"
                        >
                            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={handleOpenCreate}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center rounded-md bg-[#3C50E0] py-3 px-8 text-center font-medium text-white hover:bg-opacity-90"
                        >
                            <Plus size={18} className="mr-2" strokeWidth={3} />
                            Add User
                        </button>
                    </div>
                </div>

                {/* Table Layout */}
                <div className="max-w-full overflow-x-auto bg-white">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-white border-b border-[#E2E8F0] text-left">
                                <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-900">
                                    Account
                                </th>
                                <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-900">
                                    Identity & Role
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
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-20 text-center text-slate-400 bg-white">
                                        No entries found matching your filter.
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user, key) => (
                                <tr key={key} className="hover:bg-slate-50 transition-colors bg-white">
                                    <td className="py-5 px-6">
                                        <p className="font-bold text-slate-900">{user.email}</p>
                                        <span className="text-xs font-mono text-slate-400">ID: {user.id.substring(0, 8)}...</span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="font-bold text-slate-900 uppercase tracking-tight">
                                            {user.name || "-"}
                                        </p>
                                        <span className="inline-block mt-1 text-xs font-bold text-[#3C50E0] bg-[#3C50E0]/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                                            {user.Role?.name || "No Role"}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3 font-medium text-slate-400">
                                            <button 
                                                onClick={() => handleOpenEdit(user)}
                                                className="hover:text-[#3C50E0] transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user.id)}
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
                            className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 top-4 text-slate-400 hover:text-black"
                            >
                                <X size={18} />
                            </button>
                            
                            <h3 className="mb-5 text-lg font-extrabold text-slate-900">
                                {modalMode === 'create' ? 'Create User' : 'Update User'}
                            </h3>
                            
                            <form onSubmit={handleSave} className="space-y-3.5">
                                <div>
                                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="E.g. John Doe"
                                        className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3.5 text-sm text-black outline-none transition focus:border-[#3C50E0]"
                                        value={currentUser.name || ''}
                                        onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="E.g. admin@swasti.go.id"
                                        className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3.5 text-sm text-black outline-none transition focus:border-[#3C50E0]"
                                        value={currentUser.email || ''}
                                        onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                        Role *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3.5 text-sm text-black outline-none transition focus:border-[#3C50E0] appearance-none"
                                        value={currentUser.roleId || ''}
                                        onChange={(e) => setCurrentUser({...currentUser, roleId: Number(e.target.value)})}
                                    >
                                        <option value="" disabled>Select a role...</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                        Password <span className="text-slate-400 capitalize normal-case font-normal">{modalMode === 'edit' && "(Leave blank to keep unchanged)"}</span>
                                    </label>
                                    <input
                                        type="password"
                                        required={modalMode === 'create'}
                                        placeholder="********"
                                        className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3.5 text-sm text-black outline-none transition focus:border-[#3C50E0]"
                                        value={currentUser.password || ''}
                                        onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})}
                                    />
                                </div>

                                <div className="flex gap-3 pt-3 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 rounded-xl border border-[#E2E8F0] py-2 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 bg-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 rounded-xl bg-[#3C50E0] py-2 px-4 text-sm font-bold text-white transition hover:bg-opacity-90 shadow-sm"
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
