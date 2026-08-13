'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Sliders,
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
  ExternalLink
} from 'lucide-react';
import {
  logoutAdmin,
  getLatestSensorReading,
  getSensorDevices,
  updateSensorThreshold,
  getRentanBanjirData,
  createRentanBanjirData,
  updateRentanBanjirData,
  deleteRentanBanjirData,
  getPosyanduList,
  createPosyandu,
  saveBatchRentanBanjir,
  getKategoriList,
  getPengaduanList,
  deletePengaduan,
  SWAGGER_DOCS_URL
} from '@/lib/api';
import {
  SensorReading,
  SensorDevice,
  RentanBanjirData,
  PengaduanData
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
  const [activeTab, setActiveTab] = useState<'overview' | 'rentan' | 'pengaduan' | 'threshold'>('overview');
  const [adminName, setAdminName] = useState('Pengurus Desa');

  // Sensor State
  const [sensorReading, setSensorReading] = useState<SensorReading | null>(null);
  const [devices, setDevices] = useState<SensorDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [thresholdWaspada, setThresholdWaspada] = useState<number>(100);
  const [thresholdSiaga, setThresholdSiaga] = useState<number>(200);
  const [thresholdBahaya, setThresholdBahaya] = useState<number>(300);

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

  // Pengaduan State
  const [pengaduanList, setPengaduanList] = useState<PengaduanData[]>([]);
  const [pengaduanSearch, setPengaduanSearch] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dynamic Posyandu & Kategori Options from DB
  const [posyanduOptions, setPosyanduOptions] = useState<{ id: number; nama_posyandu: string; dusun: string }[]>([]);
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
      const [sensor, devs, rentan, pengaduan, posyandus, kategoris] = await Promise.all([
        getLatestSensorReading(),
        getSensorDevices(),
        getRentanBanjirData(),
        getPengaduanList().catch(() => []),
        getPosyanduList().catch(() => []),
        getKategoriList().catch(() => []),
      ]);
      if (sensor) setSensorReading(sensor);
      if (devs && devs.length > 0) {
        setDevices(devs);
        setSelectedDevice(devs[0].id_sensor);
        setThresholdWaspada(devs[0].threshold_waspada || 100);
        setThresholdSiaga(devs[0].threshold_siaga || 200);
        setThresholdBahaya(devs[0].threshold_bahaya || 300);
      }
      if (rentan) setRentanList(rentan);
      if (pengaduan) setPengaduanList(pengaduan);
      if (posyandus && posyandus.length > 0) {
        setPosyanduOptions(posyandus);
        setSelectedPosyanduId(posyandus[0].id);
      }
      if (kategoris && kategoris.length > 0) {
        setKategoriOptions(kategoris);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push('/login');
  };

  // --- Handlers: Rentan Banjir Batch Input ---
  const handleOpenBatchModal = (targetPosyanduId?: number, action: 'ADD' | 'EDIT' = 'ADD') => {
    setBatchModalAction(action);
    if (action === 'ADD') {
      setNewNamaPosyandu('');
      setNewDusun('Krajan');
      setCategoryCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    } else {
      const posId = targetPosyanduId || (posyanduOptions.length > 0 ? posyanduOptions[0].id : 1);
      setSelectedPosyanduId(posId);
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
    if (batchModalAction === 'ADD') {
      const trimmedName = newNamaPosyandu.trim().toLowerCase();
      if (!trimmedName) {
        showFeedback('error', 'Nama Posyandu wajib diisi!');
        return;
      }
      const existing = posyanduOptions.find(
        p => p.nama_posyandu.trim().toLowerCase() === trimmedName
      );
      if (existing) {
        showFeedback('error', `Data Posyandu "${newNamaPosyandu.trim()}" sudah ada di database!`);
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
            nama_posyandu: newNamaPosyandu.trim(),
            dusun: newDusun.trim() || 'Krajan',
            categories: categoriesPayload,
          }
        : {
            id_posyandu: Number(selectedPosyanduId),
            categories: categoriesPayload,
          };

      await saveBatchRentanBanjir(payload);
      showFeedback(
        'success',
        batchModalAction === 'ADD'
          ? `Posyandu "${newNamaPosyandu.trim()}" & data rentan berhasil ditambahkan!`
          : 'Data kelompok rentan posyandu berhasil diperbarui!'
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

  // --- Handlers: Pengaduan Delete ---
  const handleDeletePengaduan = async (id: number) => {
    if (!confirm('Hapus pengaduan warga ini?')) return;
    try {
      await deletePengaduan(id);
      showFeedback('success', 'Pengaduan berhasil dihapus');
      setPengaduanList(prev => prev.filter(p => p.id_pengaduan !== id));
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Gagal menghapus pengaduan');
    }
  };

  // --- Handlers: Threshold Settings ---
  const handleSaveThreshold = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice) return;
    try {
      await updateSensorThreshold(selectedDevice, {
        threshold_waspada: Number(thresholdWaspada),
        threshold_siaga: Number(thresholdSiaga),
        threshold_bahaya: Number(thresholdBahaya),
      });
      showFeedback('success', 'Batas threshold sensor berhasil diperbarui!');
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Gagal memperbarui threshold');
    }
  };

  const filteredRentan = rentanList.filter(item => {
    const query = rentanSearch.toLowerCase();
    return (
      (item.nama_posyandu && item.nama_posyandu.toLowerCase().includes(query)) ||
      (item.nama_kategori && item.nama_kategori.toLowerCase().includes(query)) ||
      String(item.jumlah_jiwa).includes(query)
    );
  });

  const filteredPengaduan = pengaduanList.filter(item => {
    const query = pengaduanSearch.toLowerCase();
    return (
      item.nama_pengirim.toLowerCase().includes(query) ||
      item.kontak.toLowerCase().includes(query) ||
      item.isi_pengaduan.toLowerCase().includes(query)
    );
  });

  const totalJiwaRentan = rentanList.reduce((acc, curr) => acc + (curr.jumlah_jiwa || 0), 0);

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} className="h-9 w-9" />
            <div className="flex flex-col">
              <span className="font-extrabold text-gray-900 text-base leading-tight">Admin Dashboard</span>
              <span className="text-xs text-blue-600 font-semibold">Desa Nogosari Tangguh Bencana</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchInitialData}
              disabled={loading}
              className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            <a
              href={SWAGGER_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-colors"
              title="Buka Dokumentasi Swagger API"
            >
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="hidden md:inline">Docs API (Swagger)</span>
            </a>

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
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
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
              <button onClick={() => setFeedbackMsg(null)} className="p-1 hover:opacity-75">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 border-b border-gray-200 mb-8 pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Ringkasan System
          </button>
          <button
            onClick={() => setActiveTab('rentan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'rentan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4" />
            Kelompok Rentan (SI-Care)
          </button>
          <button
            onClick={() => setActiveTab('pengaduan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'pengaduan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Pengaduan Warga
          </button>
          <button
            onClick={() => setActiveTab('threshold')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === 'threshold'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            <Sliders className="h-4 w-4" />
            Pengaturan Sensor IoT
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600">
                  <Droplet className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Status Sensor Ketinggian</p>
                  <h4 className="text-xl font-extrabold text-gray-900 mt-0.5">
                    {sensorReading?.reading !== undefined
                      ? `${sensorReading.reading} cm`
                      : sensorReading?.ketinggian_air !== undefined
                      ? `${sensorReading.ketinggian_air} cm`
                      : '0.69 m'}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {sensorReading?.status_water || sensorReading?.status_siaga || 'Aman (Normal)'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Jiwa Kelompok Rentan</p>
                  <h4 className="text-xl font-extrabold text-gray-900 mt-0.5">{totalJiwaRentan} Jiwa</h4>
                  <span className="text-[11px] font-bold text-gray-400 mt-1 block">
                    {rentanList.length} Posyandu / Kategori
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Pengaduan Masuk</p>
                  <h4 className="text-xl font-extrabold text-gray-900 mt-0.5">{pengaduanList.length} Laporan</h4>
                  <span className="text-[11px] font-bold text-amber-600 mt-1 block">
                    Siap Ditindaklanjuti
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Status Sistem Posko</p>
                  <h4 className="text-xl font-extrabold text-emerald-600 mt-0.5">Aktif 24/7</h4>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                    <Radio className="h-3 w-3 animate-pulse" />
                    Terhubung ke Server
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <h3 className="text-base font-extrabold text-gray-900 mb-4">Aksi Cepat Admin</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => { setActiveTab('rentan'); handleOpenBatchModal(); }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Tambah Data Rentan</p>
                    <p className="text-xs text-gray-500">Input data warga rentan baru</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('pengaduan')}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Cek Pengaduan Warga</p>
                    <p className="text-xs text-gray-500">Lihat laporan masyarakat</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('threshold')}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Kalibrasi Sensor IoT</p>
                    <p className="text-xs text-gray-500">Atur batas peringatan dini</p>
                  </div>
                </button>

                <a
                  href={SWAGGER_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Dokumentasi API Swagger</p>
                    <p className="text-xs text-gray-500">Spesifikasi interaktif API</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: KELOMPOK RENTAN (SI-CARE) */}
        {activeTab === 'rentan' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Kelompok Rentan Banjir (SI-Care)</h3>
                <p className="text-xs text-gray-500">Kelola data prioritas evakuasi kelompok rentan posyandu desa.</p>
              </div>
              <button
                onClick={() => handleOpenBatchModal(undefined, 'ADD')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-xs"
              >
                <Plus className="h-4 w-4" />
                Tambah Data Posyandu
              </button>
            </div>

            {/* Search Filter */}
            <div className="relative max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={rentanSearch}
                onChange={e => setRentanSearch(e.target.value)}
                placeholder="Cari nama posyandu atau kategori..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">No.</th>
                      <th className="px-6 py-3.5">Posyandu / Wilayah</th>
                      <th className="px-6 py-3.5">Kategori Rentan</th>
                      <th className="px-6 py-3.5">Jumlah Jiwa</th>
                      <th className="px-6 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRentan.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                          Belum ada data kelompok rentan yang ditemukan.
                        </td>
                      </tr>
                    ) : (
                      filteredRentan.map((item, index) => (
                        <tr key={item.id ?? item.id_rentan ?? index} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 font-bold text-gray-800">{item.nama_posyandu || `Posyandu #${item.id_posyandu}`}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                              {item.nama_kategori || `Kategori #${item.id_kategori}`}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-extrabold text-gray-900">{item.jumlah_jiwa} Jiwa</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenBatchModal(item.id_posyandu, 'EDIT')}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Data"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRentan(item.id ?? item.id_rentan ?? 0)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus Data"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PENGADUAN WARGA */}
        {activeTab === 'pengaduan' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-gray-900">Daftar Pengaduan Warga</h3>
              <p className="text-xs text-gray-500">Laporan dan masukan langsung dari warga Desa Nogosari.</p>
            </div>

            {/* Search Filter */}
            <div className="relative max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={pengaduanSearch}
                onChange={e => setPengaduanSearch(e.target.value)}
                placeholder="Cari pengirim, kontak, atau isi..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPengaduan.length === 0 ? (
                <div className="col-span-full bg-white p-8 rounded-2xl text-center text-gray-400 border border-gray-200">
                  Tidak ada laporan pengaduan warga.
                </div>
              ) : (
                filteredPengaduan.map(item => (
                  <div key={item.id_pengaduan} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-gray-900">{item.nama_pengirim}</span>
                        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          {item.kontak}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                        &quot;{item.isi_pengaduan}&quot;
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                      <span>{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : 'Baru saja'}</span>
                      <button
                        onClick={() => handleDeletePengaduan(item.id_pengaduan)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus Laporan
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: THRESHOLD SETTINGS */}
        {activeTab === 'threshold' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Pengaturan Threshold Sensor IoT</h3>
                <p className="text-xs text-gray-500">Sesuaikan ambang batas peringatan dini ketinggian air (cm) untuk memicu notifikasi siaga.</p>
              </div>

              <form onSubmit={handleSaveThreshold} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">Pilih Perangkat Sensor</label>
                  <select
                    value={selectedDevice}
                    onChange={e => {
                      const devId = e.target.value;
                      setSelectedDevice(devId);
                      const match = devices.find(d => d.id_sensor === devId);
                      if (match) {
                        setThresholdWaspada(match.threshold_waspada);
                        setThresholdSiaga(match.threshold_siaga);
                        setThresholdBahaya(match.threshold_bahaya);
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:border-blue-500"
                  >
                    {devices.length === 0 ? (
                      <option value="">Sensor Utama Gumuk Bago</option>
                    ) : (
                      devices.map(d => (
                        <option key={d.id_sensor} value={d.id_sensor}>
                          {d.nama_sensor} ({d.lokasi})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                    <label className="text-xs font-bold text-amber-800 block">Waspada (cm)</label>
                    <input
                      type="number"
                      required
                      value={thresholdWaspada}
                      onChange={e => setThresholdWaspada(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white font-bold"
                    />
                    <p className="text-[10px] text-amber-600">Peringatan awal</p>
                  </div>

                  <div className="space-y-1.5 bg-orange-50/60 p-4 rounded-xl border border-orange-200">
                    <label className="text-xs font-bold text-orange-800 block">Siaga (cm)</label>
                    <input
                      type="number"
                      required
                      value={thresholdSiaga}
                      onChange={e => setThresholdSiaga(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-orange-300 text-xs bg-white font-bold"
                    />
                    <p className="text-[10px] text-orange-600">Persiapan evakuasi</p>
                  </div>

                  <div className="space-y-1.5 bg-red-50/60 p-4 rounded-xl border border-red-200">
                    <label className="text-xs font-bold text-red-800 block">Bahaya (cm)</label>
                    <input
                      type="number"
                      required
                      value={thresholdBahaya}
                      onChange={e => setThresholdBahaya(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-red-300 text-xs bg-white font-bold"
                    />
                    <p className="text-[10px] text-red-600">Evakuasi darurat</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-xs mt-4"
                >
                  Simpan Perubahan Threshold
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* SINGLE UNIFIED BATCH INPUT MODAL (SEKALIGUS INPUT 6 KATEGORI) */}
      <AnimatePresence>
        {isBatchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 border border-gray-200 shadow-xl space-y-5 my-8"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">
                    {batchModalAction === 'EDIT' ? 'Edit Data Kelompok Rentan Posyandu' : 'Tambah Posyandu Baru'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {batchModalAction === 'EDIT' ? 'Perbarui jumlah jiwa untuk 6 kategori rentan.' : 'Masukkan nama posyandu, dusun, dan jumlah jiwa 6 kategori rentan.'}
                  </p>
                </div>
                <button onClick={() => setIsBatchModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBatch} className="space-y-5">

                {batchModalAction === 'ADD' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Posyandu Baru</label>
                      <input
                        type="text"
                        required
                        value={newNamaPosyandu}
                        onChange={e => setNewNamaPosyandu(e.target.value)}
                        placeholder="Misal: Posyandu Bougenville 64"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-500 font-bold bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Dusun / Wilayah</label>
                      <input
                        type="text"
                        required
                        value={newDusun}
                        onChange={e => setNewDusun(e.target.value)}
                        placeholder="Misal: Krajan / Gumuk Bago"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-500 font-bold bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Nama Posyandu</label>
                      <input
                        type="text"
                        disabled
                        value={posyanduOptions.find(p => p.id === selectedPosyanduId)?.nama_posyandu || ''}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-100 text-gray-700 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Wilayah / Dusun</label>
                      <input
                        type="text"
                        disabled
                        value={posyanduOptions.find(p => p.id === selectedPosyanduId)?.dusun || 'Krajan'}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-100 text-gray-700 font-bold"
                      />
                    </div>
                  </div>
                )}

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {kategoriOptions.map(kat => (
                      <div key={kat.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-colors">
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

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsBatchModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-xs"
                  >
                    {batchModalAction === 'EDIT' ? 'Simpan Perubahan Data Posyandu' : 'Tambah Data Posyandu'}
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
