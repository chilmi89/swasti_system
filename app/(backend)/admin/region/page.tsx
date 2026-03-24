"use client";

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Search, 
    X,
    Loader2,
    RefreshCw,
    MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

type Region = {
    id: number;
    name: string;
    type: string | null;
};

export default function RegionManagementPage() {
    const [regions, setRegions] = useState<Region[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [currentRegion, setCurrentRegion] = useState<Partial<Region>>({ id: undefined, name: '', type: 'PROVINCE' });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/region');
            if (!res.ok) throw new Error("Gagal mengambil data wilayah");
            const data = await res.json();
            setRegions(Array.isArray(data) ? data : []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setModalMode('create');
        setCurrentRegion({ id: undefined, name: '', type: 'PROVINCE' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (region: Region) => {
        setModalMode('edit');
        setCurrentRegion(region);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus wilayah ini?")) return;
        
        try {
            const res = await fetch(`/api/admin/region?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Wilayah berhasil dihapus");
                fetchRegions();
            } else {
                const data = await res.json();
                toast.error(data.error || "Gagal menghapus wilayah");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const res = await fetch('/api/admin/region', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: currentRegion.id,
                    name: currentRegion.name?.toUpperCase().trim(),
                    type: currentRegion.type
                })
            });
            
            if (res.ok) {
                toast.success(modalMode === 'create' ? "Wilayah berhasil ditambahkan" : "Wilayah berhasil diperbarui");
                setIsModalOpen(false);
                fetchRegions();
            } else {
                const err = await res.json();
                toast.error(err.error || "Gagal menyimpan data wilayah");
            }
        } catch (error) {
            toast.error("Kesalahan jaringan: Gagal menghubungi server");
        } finally {
            setIsSaving(false);
        }
    };

    const filteredRegions = regions.filter(region => 
        region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        region.id.toString().includes(searchQuery)
    );

    return (
        <div className="mx-auto max-w-7xl pb-10 bg-white min-h-screen">
            {/* Breadcrumb Section */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0 pt-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="text-[#3C50E0]" size={24} />
                    Region Master Data
                </h2>
                <nav>
                    <ol className="flex items-center gap-2 text-sm font-medium">
                        <li><span className="text-slate-400">Dashboard /</span></li>
                        <li className="text-[#3C50E0]">Regions</li>
                    </ol>
                </nav>
            </div>

            {/* Integrated Table Card */}
            <div className="rounded-sm border border-[#E2E8F0] bg-white shadow-sm overflow-hidden mx-4 sm:mx-0">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4 border-b border-[#E2E8F0]">
                    <div className="relative w-full max-w-sm">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari berdasarkan ID atau Nama..."
                            className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 pl-11 pr-4 text-black outline-none focus:border-[#3C50E0] transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                            onClick={fetchRegions}
                            className="flex items-center justify-center rounded-md border border-[#E2E8F0] p-3 text-slate-500 hover:text-[#3C50E0] transition-colors"
                        >
                            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={handleOpenCreate}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center rounded-md bg-[#3C50E0] py-3 px-8 text-center font-bold text-white hover:bg-opacity-90 shadow-sm"
                        >
                            <Plus size={18} className="mr-2" strokeWidth={3} />
                            Add Region
                        </button>
                    </div>
                </div>

                {/* Table Layout */}
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-left">
                                <th className="py-5 px-6 font-bold text-[10px] uppercase tracking-widest text-slate-500 w-24">
                                    ID / KODE
                                </th>
                                <th className="py-5 px-6 font-bold text-[10px] uppercase tracking-widest text-slate-500">
                                    NAMA WILAYAH
                                </th>
                                <th className="py-5 px-6 font-bold text-[10px] uppercase tracking-widest text-slate-500">
                                    TIPE
                                </th>
                                <th className="py-5 px-6 font-bold text-[10px] uppercase tracking-widest text-slate-500 text-right">
                                    AKSI
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="py-24 text-center">
                                        <Loader2 className="animate-spin mx-auto text-[#3C50E0]" size={32} />
                                        <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Memuat Data...</p>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-red-500 font-bold text-xs uppercase">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredRegions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-slate-400 text-sm font-medium">
                                        Tidak ada data yang ditemukan.
                                    </td>
                                </tr>
                            ) : filteredRegions.map((region, key) => (
                                <tr key={key} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-5 px-6">
                                        <span className="font-mono text-xs font-bold text-slate-900 px-2 py-1 bg-slate-100 rounded-sm">
                                            {region.id}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="font-bold text-slate-900 tracking-tight">
                                            {region.name}
                                        </p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className="inline-block px-2 py-1 text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 rounded-sm">
                                            {region.type || "PROVINCE"}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3 font-medium text-slate-400">
                                            <button 
                                                onClick={() => handleOpenEdit(region)}
                                                className="hover:text-[#3C50E0] transition-colors p-1"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(region.id)}
                                                className="hover:text-red-500 transition-colors p-1"
                                                title="Delete"
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

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-[480px] rounded-lg bg-white p-8 shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-6 top-6 text-slate-400 hover:text-black transition-colors"
                            >
                                <X size={20} />
                            </button>
                            
                            <h3 className="mb-8 text-xl font-bold text-slate-900">
                                {modalMode === 'create' ? 'Tambah Wilayah Baru' : 'Perbarui Wilayah'}
                            </h3>
                            
                            <form onSubmit={handleSave} className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-500 tracking-widest">
                                        ID / Kode Wilayah (Manual)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        disabled={modalMode === 'edit'}
                                        placeholder="Contoh: 31 (Jakarta)"
                                        className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 px-4 text-sm font-medium text-black outline-none transition focus:border-[#3C50E0] disabled:bg-slate-50 disabled:text-slate-400"
                                        value={currentRegion.id || ''}
                                        onChange={(e) => setCurrentRegion({...currentRegion, id: Number(e.target.value)})}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-500 tracking-widest">
                                        Nama Wilayah
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        autoFocus={modalMode === 'edit'}
                                        placeholder="Contoh: JAWA BARAT"
                                        className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 px-4 text-sm font-medium text-black outline-none transition focus:border-[#3C50E0]"
                                        value={currentRegion.name}
                                        onChange={(e) => setCurrentRegion({...currentRegion, name: e.target.value.toUpperCase()})}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase text-slate-500 tracking-widest">
                                        Tipe Wilayah
                                    </label>
                                    <select
                                        className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 px-4 text-sm font-medium text-black outline-none transition focus:border-[#3C50E0]"
                                        value={currentRegion.type || "PROVINCE"}
                                        onChange={(e) => setCurrentRegion({...currentRegion, type: e.target.value})}
                                    >
                                        <option value="PROVINCE">PROVINCE</option>
                                        <option value="CITY">CITY</option>
                                        <option value="DISTRICT">DISTRICT</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 rounded-md border border-[#E2E8F0] p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 rounded-md bg-[#3C50E0] p-3 text-sm font-bold text-white transition hover:bg-opacity-90 shadow-md flex items-center justify-center gap-2"
                                    >
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? "Menyimpan..." : (modalMode === 'create' ? "Tambah" : "Simpan Perubahan")}
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