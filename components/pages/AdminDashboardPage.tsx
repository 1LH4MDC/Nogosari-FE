'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  X,
  Building,
  Radio,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  logoutAdmin,
  getLatestSensorReading,
  getRentanBanjirData,
  createRentanBanjirData,
  updateRentanBanjirData,
  deleteRentanBanjirData,
  getPosyanduList,
  getDusunList,
  createPosyandu,
  deletePosyandu,
  saveBatchRentanBanjir,
  getKategoriList,
  SWAGGER_DOCS_URL
} from '@/lib/api';
import {
  SensorReading,
  RentanBanjirData,
  DusunOption
} from '@/types';
import { Logo } from '@/components/common';

const POSYANDU_OPTIONS = [
  { id: 1, name: 'Posyandu Bougenville 59' },
  { id: 2, name: 'Posyandu Melati 12' },
  { id: 3, name: 'Posyandu Mawar 04' },
];

const KATEGORI_OPTIONS = [
  { id: 1, name: 'Bayi & Balita' },
  { id: 2, name: 'Ibu Hamil & Menyusui' },
  { id: 3, name: 'Lansia' },
  { id: 4, name: 'Disabilitas' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'rentan'>('overview');
  const [adminName, setAdminName] = useState('Pengurus Desa');

  // Sensor State
  const [sensorReading, setSensorReading] = useState<SensorReading | null>(null);

  // Rentan State
  const [rentanList, setRentanList] = useState<RentanBanjirData[]>([]);
  const [rentanSearch, setRentanSearch] = useState('');
  // Batch Form State (Input semua 6 kategori sekaligus per posyandu)
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchModalAction, setBatchModalAction] = useState<'ADD' | 'EDIT'>('ADD');
  const [posyanduMode, setPosyanduMode] = useState<'EXISTING' | 'NEW'>('EXISTING');
  const [selectedPosyanduId, setSelectedPosyanduId] = useState<number>(1);
  const [newNamaPosyandu, setNewNamaPosyandu] = useState('');
  const [newDusun, setNewDusun] = useState('Krajan');
  const [categoryCounts, setCategoryCounts] = useState<{ [key: number]: number }>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  });

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Dynamic Posyandu, Dusun & Kategori Options from DB
  const [posyanduOptions, setPosyanduOptions] = useState<{ id: number; nama_posyandu: string; dusun: string }[]>([]);
  const [dusunOptions, setDusunOptions] = useState<DusunOption[]>([]);
  const [kategoriOptions, setKategoriOptions] = useState<{ id: number; nama_kategori: string }[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.email) setAdminName(parsed.email.split('@')[0]);
        } catch {
          // ignore
        }
      }
    }
    fetchInitialData();
  }, []);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [sensor, rentan, posyandus, kategoris, dusuns] = await Promise.all([
        getLatestSensorReading(),
        getRentanBanjirData(),
        getPosyanduList().catch(() => []),
        getKategoriList().catch(() => []),
        getDusunList().catch(() => []),
      ]);
      if (sensor) setSensorReading(sensor);
      if (rentan) setRentanList(rentan);
      if (posyandus && posyandus.length > 0) {
        setPosyanduOptions(posyandus);
        setSelectedPosyanduId(posyandus[0].id);
      }
      if (kategoris && kategoris.length > 0) {
        setKategoriOptions(kategoris);
      }
      if (dusuns && dusuns.length > 0) {
        setDusunOptions(dusuns);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logoutAdmin();
    router.push('/login');
  };

  // --- Handlers: Rentan Banjir Batch Input ---
  const handleOpenBatchModal = (targetPosyanduId?: number, action: 'ADD' | 'EDIT' = 'ADD') => {
    setBatchModalAction(action);
    if (action === 'ADD') {
      setNewNamaPosyandu('');
      setNewDusun(dusunOptions.length > 0 ? dusunOptions[0].nama_dusun : 'Dusun Gumukbagu');
      setCategoryCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    } else {
      const posId = targetPosyanduId || (posyanduOptions.length > 0 ? posyanduOptions[0].id : 1);
      setSelectedPosyanduId(posId);
      const targetPosyandu = posyanduOptions.find(p => p.id === posId);
      setNewNamaPosyandu(targetPosyandu?.nama_posyandu || '');
      setNewDusun(targetPosyandu?.dusun || (dusunOptions.length > 0 ? dusunOptions[0].nama_dusun : 'Dusun Gumukbagu'));

      const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
      rentanList.filter(r => r.id_posyandu === posId).forEach(r => {
        if (r.id_kategori) counts[r.id_kategori] = r.jumlah_jiwa || 0;
      });
      setCategoryCounts(counts);
    }
    setIsBatchModalOpen(true);
  };

  const handleSaveBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newNamaPosyandu.trim();
    if (!trimmedName) {
      showFeedback('error', 'Nama Posyandu wajib diisi!');
      return;
    }

    if (batchModalAction === 'ADD') {
      const existing = posyanduOptions.find(
        p => p.nama_posyandu.trim().toLowerCase() === trimmedName.toLowerCase()
      );
      if (existing) {
        showFeedback('error', `Data Posyandu "${trimmedName}" sudah ada di database!`);
        return;
      }
    } else {
      const existing = posyanduOptions.find(
        p => p.id !== selectedPosyanduId && p.nama_posyandu.trim().toLowerCase() === trimmedName.toLowerCase()
      );
      if (existing) {
        showFeedback('error', `Nama Posyandu "${trimmedName}" sudah digunakan oleh Posyandu lain!`);
        return;
      }
    }

    try {
      const categoriesPayload = Object.entries(categoryCounts).map(([kId, val]) => ({
        id_kategori: Number(kId),
        jumlah_jiwa: Number(val) || 0,
      }));

      const payload = batchModalAction === 'ADD'
        ? {
            nama_posyandu: trimmedName,
            dusun: newDusun.trim() || 'Krajan',
            categories: categoriesPayload,
          }
        : {
            id_posyandu: Number(selectedPosyanduId),
            nama_posyandu: trimmedName,
            dusun: newDusun.trim() || 'Krajan',
            categories: categoriesPayload,
          };

      await saveBatchRentanBanjir(payload);
      showFeedback(
        'success',
        batchModalAction === 'ADD'
          ? `Posyandu "${trimmedName}" & data rentan berhasil ditambahkan!`
          : `Data Posyandu "${trimmedName}" & kelompok rentan berhasil diperbarui!`
      );
      setIsBatchModalOpen(false);

      const [updatedRentan, updatedPosyandus] = await Promise.all([
        getRentanBanjirData(),
        getPosyanduList(),
      ]);
      if (updatedRentan) setRentanList(updatedRentan);
      if (updatedPosyandus) setPosyanduOptions(updatedPosyandus);
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Gagal menyimpan data');
    }
  };

  const handleDeleteRentan = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    try {
      await deleteRentanBanjirData(id);
      showFeedback('success', 'Data berhasil dihapus');
      setRentanList(prev => prev.filter(r => r.id_rentan !== id));
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Gagal menghapus data');
    }
  };

  // --- Handlers: Delete Posyandu ---
  const handleDeletePosyandu = async (posId: number, posName: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus Posyandu "${posName}" beserta seluruh rincian kelompok rentan terkait?`)) {
      return;
    }
    try {
      await deletePosyandu(posId);
      showFeedback('success', `Data Posyandu "${posName}" berhasil dihapus!`);
      const [updatedRentan, updatedPosyandus] = await Promise.all([
        getRentanBanjirData(),
        getPosyanduList(),
      ]);
      if (updatedRentan) setRentanList(updatedRentan);
      if (updatedPosyandus) setPosyanduOptions(updatedPosyandus);
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Gagal menghapus posyandu');
    }
  };

  const [expandedPosyanduIds, setExpandedPosyanduIds] = useState<number[]>([]);

  const toggleExpandPosyandu = (posId: number) => {
    setExpandedPosyanduIds(prev =>
      prev.includes(posId) ? prev.filter(id => id !== posId) : [...prev, posId]
    );
  };

  const groupedPosyanduList = React.useMemo(() => {
    const map = new Map<number, {
      id_posyandu: number;
      nama_posyandu: string;
      dusun: string;
      total_jiwa: number;
      categories: { id_kategori: number; nama_kategori: string; jumlah_jiwa: number }[];
    }>();

    posyanduOptions.forEach(p => {
      map.set(p.id, {
        id_posyandu: p.id,
        nama_posyandu: p.nama_posyandu,
        dusun: p.dusun || 'Dusun Krajan',
        total_jiwa: 0,
        categories: [],
      });
    });

    rentanList.forEach(item => {
      const pId = item.id_posyandu;
      if (!map.has(pId)) {
        map.set(pId, {
          id_posyandu: pId,
          nama_posyandu: item.nama_posyandu || `Posyandu #${pId}`,
          dusun: item.dusun || 'Dusun Krajan',
          total_jiwa: 0,
          categories: [],
        });
      }
      const group = map.get(pId)!;
      const count = item.jumlah_jiwa || 0;
      group.total_jiwa += count;
      if (item.id_kategori) {
        group.categories.push({
          id_kategori: item.id_kategori,
          nama_kategori: item.nama_kategori || `Kategori #${item.id_kategori}`,
          jumlah_jiwa: count,
        });
      }
    });

    return Array.from(map.values());
  }, [posyanduOptions, rentanList]);

  const filteredGroupedPosyandu = React.useMemo(() => {
    const query = rentanSearch.toLowerCase();
    if (!query) return groupedPosyanduList;
    return groupedPosyanduList.filter(item =>
      item.nama_posyandu.toLowerCase().includes(query) ||
      item.dusun.toLowerCase().includes(query) ||
      String(item.total_jiwa).includes(query) ||
      item.categories.some(c => c.nama_kategori.toLowerCase().includes(query))
    );
  }, [groupedPosyanduList, rentanSearch]);

  const totalJiwaRentan = React.useMemo(
    () => rentanList.reduce((acc, curr) => acc + (curr.jumlah_jiwa || 0), 0),
    [rentanList]
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <Logo size={32} className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight truncate">Admin Dashboard</span>
              <span className="text-[10px] sm:text-xs text-blue-600 font-semibold truncate">Desa Nogosari Tangguh Bencana</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={fetchInitialData}
              disabled={loading}
              className="p-1.5 sm:p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                {adminName.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-xs">
                <p className="font-bold text-gray-800 capitalize">{adminName}</p>
                <p className="text-gray-400">Pengurus Desa</p>
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 w-full">
        {/* Toast Feedback */}
        <AnimatePresence>
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-xl text-sm font-semibold flex items-center justify-between border shadow-sm ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              <span>{feedbackMsg.text}</span>
              <button onClick={() => setFeedbackMsg(null)} className="p-1 hover:opacity-75 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Symmetrical Responsive Tab Navigation (2 Balanced Tabs) */}
        <div className="flex overflow-x-auto gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-gray-200/60 rounded-2xl border border-gray-200/80 mb-6 sm:mb-8 scrollbar-none">
          {[
            { id: 'overview', label: 'Ringkasan System', icon: LayoutDashboard },
            { id: 'rentan', label: 'Kelompok Rentan (SI-Care)', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'rentan')}
                className={`min-w-[120px] sm:min-w-0 flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-white/80 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 sm:space-y-8">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center gap-3.5 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Droplet className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 truncate">Jarak Sensor Ketinggian</p>
                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-0.5">
                    {sensorReading?.reading !== undefined
                      ? `${(sensorReading.reading / 100).toFixed(2)} m`
                      : sensorReading?.ketinggian_air !== undefined
                      ? `${(sensorReading.ketinggian_air / 100).toFixed(2)} m`
                      : '3.45 m'}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1 truncate">
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                    {sensorReading?.status_water || sensorReading?.status_siaga || 'Aman (Normal)'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center gap-3.5 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 truncate">Jiwa Kelompok Rentan</p>
                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-0.5">{totalJiwaRentan} Jiwa</h4>
                  <span className="text-[11px] font-bold text-gray-400 mt-1 block truncate">
                    {rentanList.length} Data Kategori
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center gap-3.5 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Building className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 truncate">Posyandu Terdata</p>
                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-0.5">{posyanduOptions.length} Posyandu</h4>
                  <span className="text-[11px] font-bold text-emerald-600 mt-1 block truncate">
                    Tersebar di 5 Dusun
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center gap-3.5 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 truncate">Status Sistem Posko</p>
                  <h4 className="text-lg sm:text-xl font-extrabold text-cyan-700 mt-0.5">Aktif 24/7</h4>
                  <span className="text-[11px] font-bold text-cyan-600 flex items-center gap-1 mt-1 truncate">
                    <Radio className="h-3 w-3 animate-pulse shrink-0" />
                    Terhubung ke Server
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs">
              <h3 className="text-base font-extrabold text-gray-900 mb-4">Aksi Cepat Admin</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <button
                  onClick={() => { setActiveTab('rentan'); handleOpenBatchModal(); }}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">Tambah Data Rentan</p>
                    <p className="text-xs text-gray-500 truncate">Input data warga rentan baru</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('rentan')}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">Kelola Data Posyandu</p>
                    <p className="text-xs text-gray-500 truncate">Lihat dan ubah rincian kelompok rentan</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: KELOMPOK RENTAN (SI-CARE) */}
        {activeTab === 'rentan' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900">Kelompok Rentan Banjir (SI-Care)</h3>
                <p className="text-xs text-gray-500">Kelola data prioritas evakuasi kelompok rentan posyandu desa.</p>
              </div>
              <button
                onClick={() => handleOpenBatchModal(undefined, 'ADD')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Tambah Data Posyandu
              </button>
            </div>

            {/* Search Filter */}
            <div className="relative max-w-md w-full">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={rentanSearch}
                onChange={e => setRentanSearch(e.target.value)}
                placeholder="Cari nama posyandu, dusun, atau kategori..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Responsive Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600 min-w-[550px] sm:min-w-0">
                  <thead className="bg-gray-50/80 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="px-3 sm:px-6 py-3.5">No.</th>
                      <th className="px-3 sm:px-6 py-3.5">Nama Posyandu</th>
                      <th className="px-3 sm:px-6 py-3.5">Dusun / Wilayah</th>
                      <th className="px-3 sm:px-6 py-3.5">Total Jiwa Rentan</th>
                      <th className="px-3 sm:px-6 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredGroupedPosyandu.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                          Belum ada data kelompok rentan yang ditemukan.
                        </td>
                      </tr>
                    ) : (
                      filteredGroupedPosyandu.map((item, index) => {
                        const isExpanded = expandedPosyanduIds.includes(item.id_posyandu);
                        return (
                          <React.Fragment key={item.id_posyandu}>
                            <tr
                              onClick={() => toggleExpandPosyandu(item.id_posyandu)}
                              className={`cursor-pointer transition-colors ${
                                isExpanded ? 'bg-blue-50/40' : 'hover:bg-gray-50/80'
                              }`}
                            >
                              <td className="px-3 sm:px-6 py-4 font-bold text-gray-900">{index + 1}</td>
                              <td className="px-3 sm:px-6 py-4 font-extrabold text-gray-900">
                                {item.nama_posyandu}
                              </td>
                              <td className="px-3 sm:px-6 py-4">
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 whitespace-nowrap">
                                  {item.dusun}
                                </span>
                              </td>
                              <td className="px-3 sm:px-6 py-4">
                                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
                                  {item.total_jiwa} Jiwa
                                </span>
                              </td>
                              <td className="px-3 sm:px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                                  <button
                                    onClick={() => toggleExpandPosyandu(item.id_posyandu)}
                                    className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-bold text-[11px] sm:text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                                    title="Lihat Detail Kelompok Rentan"
                                  >
                                    <span>{isExpanded ? 'Tutup' : 'Detail'}</span>
                                    {isExpanded ? <ChevronUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                                  </button>

                                  <button
                                    onClick={() => handleOpenBatchModal(item.id_posyandu, 'EDIT')}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center cursor-pointer"
                                    title="Edit Data Posyandu & Kategori"
                                  >
                                    <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  </button>

                                  <button
                                    onClick={() => handleDeletePosyandu(item.id_posyandu, item.nama_posyandu)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center cursor-pointer"
                                    title="Hapus Posyandu & Data Kelompok Rentan"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* EXPANDED ACCORDION ROW: DETAIL 6 KATEGORI RENTAN */}
                            {isExpanded && (
                              <tr className="bg-blue-50/20">
                                <td colSpan={5} className="p-0 border-t border-b border-blue-100/70">
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-3 sm:p-5">
                                      <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: 0.05 }}
                                        className="bg-white p-3.5 sm:p-5 rounded-2xl border border-blue-100 shadow-xs space-y-3.5"
                                      >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-1.5">
                                          <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                                            <h5 className="font-extrabold text-xs text-blue-900 uppercase tracking-wider">
                                              Rincian 6 Kategori Rentan — {item.nama_posyandu}
                                            </h5>
                                          </div>
                                          <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 self-start sm:self-auto">
                                            Total: {item.total_jiwa} Jiwa
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
                                          {kategoriOptions.map((kat, katIdx) => {
                                            const found = item.categories.find(c => c.id_kategori === kat.id);
                                            const count = found ? found.jumlah_jiwa : 0;
                                            return (
                                              <motion.div
                                                key={kat.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.2, delay: katIdx * 0.03 }}
                                                className="p-2.5 sm:p-3 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-blue-200 hover:shadow-2xs transition-all flex flex-col items-center justify-center text-center"
                                              >
                                                <span className="text-[11px] font-semibold text-gray-500 line-clamp-1">
                                                  {kat.nama_kategori}
                                                </span>
                                                <span className="text-sm sm:text-base font-black text-gray-900 mt-1">
                                                  {count} <span className="text-[10px] font-bold text-gray-400">Jiwa</span>
                                                </span>
                                              </motion.div>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    </div>
                                  </motion.div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* SINGLE UNIFIED BATCH INPUT MODAL (SEKALIGUS INPUT 6 KATEGORI) */}
      <AnimatePresence>
        {isBatchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-6 border border-gray-200 shadow-xl space-y-4 sm:space-y-5 my-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="pr-4">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900">
                    {batchModalAction === 'EDIT' ? 'Edit Data Kelompok Rentan Posyandu' : 'Tambah Posyandu Baru'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {batchModalAction === 'EDIT' ? 'Perbarui jumlah jiwa untuk 6 kategori rentan.' : 'Masukkan nama posyandu, dusun, dan jumlah jiwa 6 kategori rentan.'}
                  </p>
                </div>
                <button onClick={() => setIsBatchModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBatch} className="space-y-4 sm:space-y-5">
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border ${
                  batchModalAction === 'ADD' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-blue-50/50 border-blue-100'
                }`}>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">
                      {batchModalAction === 'ADD' ? 'Nama Posyandu Baru' : 'Nama Posyandu'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newNamaPosyandu}
                      onChange={e => setNewNamaPosyandu(e.target.value)}
                      placeholder="Misal: Posyandu Bougenville 59"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-blue-500 font-bold bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Dusun / Wilayah</label>
                    <select
                      value={newDusun}
                      onChange={e => setNewDusun(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-blue-500 font-bold bg-white"
                    >
                      {(dusunOptions.length > 0
                        ? dusunOptions
                        : [
                            { id: 1, nama_dusun: 'Dusun Gumukbagu' },
                            { id: 2, nama_dusun: 'Dusun Gumukgebang' },
                            { id: 3, nama_dusun: 'Dusun Gumuklimo' },
                            { id: 4, nama_dusun: 'Dusun Gumuksari' },
                            { id: 5, nama_dusun: 'Dusun Krajan' },
                          ]
                      ).map(d => (
                        <option key={d.id} value={d.nama_dusun}>
                          {d.nama_dusun}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 6 Kategori Input Grid */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs uppercase tracking-wider font-extrabold text-gray-500">
                      JUMLAH JIWA PER KATEGORI RENTAN
                    </label>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      Total: {Object.values(categoryCounts).reduce((a, b) => Number(a) + Number(b || 0), 0)} Jiwa
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {kategoriOptions.map(kat => (
                      <div key={kat.id} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-colors">
                        <span className="text-xs font-bold text-gray-800">{kat.nama_kategori}</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            value={categoryCounts[kat.id] ?? 0}
                            onChange={e => setCategoryCounts({ ...categoryCounts, [kat.id]: Math.max(0, Number(e.target.value)) })}
                            className="w-20 px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs text-right font-extrabold focus:outline-none focus:border-blue-500 bg-white"
                          />
                          <span className="text-[11px] font-semibold text-gray-500">Jiwa</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsBatchModalOpen(false)}
                    className="w-full sm:flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    {batchModalAction === 'EDIT' ? 'Simpan Perubahan Data' : 'Tambah Data Posyandu'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM LOGOUT CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 border border-gray-100 shadow-2xl space-y-4 sm:space-y-5 text-center mx-4"
            >
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                <LogOut className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  Konfirmasi Keluar
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Apakah Anda yakin ingin keluar dari halaman Admin Dashboard Desa Nogosari?
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Ya, Keluar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
