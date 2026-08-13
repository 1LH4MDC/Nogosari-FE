'use client';

import { useEffect, useState } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/common';
import { getRentanBanjirData } from '@/lib/api';
import { RentanBanjirData } from '@/types';

export interface PosyanduGroup {
  id_posyandu: number;
  name: string;
  dusun: string;
  bayi: number;
  balita: number;
  ibuHamil: number;
  ibuMenyusui: number;
  lansia: number;
  disabilitas: number;
  totalJiwa: number;
}

const dusunTabs = [
  { id: 'ALL', label: 'Semua Dusun' },
  { id: 'GUMUKBAGU', label: 'Dusun Gumukbagu' },
  { id: 'GUMUKGEBANG', label: 'Dusun Gumukgebang' },
  { id: 'GUMUKLIMO', label: 'Dusun Gumuklimo' },
  { id: 'GUMUKSARI', label: 'Dusun Gumuksari' },
  { id: 'KRAJAN', label: 'Dusun Krajan' },
];

export default function DataPage() {
  const [selectedDusun, setSelectedDusun] = useState('ALL');
  const [rawData, setRawData] = useState<RentanBanjirData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRentanBanjirData();
      if (data) setRawData(data);
    } catch (err) {
      console.error('Failed to load rentan data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group raw DB rows by Posyandu
  const posyanduMap = new Map<number, PosyanduGroup>();
  let totalJiwaOverall = 0;
  let totalBayi = 0;
  let totalBalita = 0;
  let totalIbuHamil = 0;
  let totalIbuMenyusui = 0;
  let totalLansia = 0;
  let totalDisabilitas = 0;

  rawData.forEach(item => {
    const pId = item.id_posyandu;
    totalJiwaOverall += item.jumlah_jiwa || 0;

    if (!posyanduMap.has(pId)) {
      posyanduMap.set(pId, {
        id_posyandu: pId,
        name: item.nama_posyandu || `POSYANDU #${pId}`,
        dusun: item.dusun || 'Dusun Krajan',
        bayi: 0,
        balita: 0,
        ibuHamil: 0,
        ibuMenyusui: 0,
        lansia: 0,
        disabilitas: 0,
        totalJiwa: 0,
      });
    }

    const group = posyanduMap.get(pId)!;
    group.totalJiwa += item.jumlah_jiwa || 0;
    const kat = item.id_kategori;
    const katName = (item.nama_kategori || '').toLowerCase();
    const count = item.jumlah_jiwa || 0;

    if (kat === 1 || katName.includes('bayi')) {
      group.bayi += count;
      totalBayi += count;
    } else if (kat === 2 || katName.includes('balita')) {
      group.balita += count;
      totalBalita += count;
    } else if (kat === 3 || katName.includes('hamil')) {
      group.ibuHamil += count;
      totalIbuHamil += count;
    } else if (kat === 4 || katName.includes('menyusui')) {
      group.ibuMenyusui += count;
      totalIbuMenyusui += count;
    } else if (kat === 5 || katName.includes('lansia')) {
      group.lansia += count;
      totalLansia += count;
    } else if (kat === 6 || katName.includes('disabilitas')) {
      group.disabilitas += count;
      totalDisabilitas += count;
    }
  });

  const posyanduList = Array.from(posyanduMap.values());

  const filteredList = selectedDusun === 'ALL'
    ? posyanduList
    : posyanduList.filter((item) => item.dusun.replace(/\s+/g, '').includes(selectedDusun.replace(/\s+/g, '')));

  return (
    <div className="bg-[#f4f7fb] min-h-screen py-10 sm:py-14">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* 1. Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Transparansi Data Kelompok Rentan
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
              Data kelompok rentan ini diambil berdasarkan data riil dari 5 dusun yang ada di Desa Nogosari, Kecamatan Rambipuji, Jember.
            </p>
          </div>
        </motion.div>

        {/* 1B. Top Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">

          {/* Card Kiri: Total Penduduk Rentan DB */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-blue-50/60 -z-0" />

            <div className="relative z-10">
              <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
                TOTAL KELOMPOK RENTAN
              </span>
              <div className="flex items-baseline gap-2 mt-2 mb-6">
                <span className="text-4xl font-extrabold text-[#1d4ed8]">
                  {loading ? '...' : totalJiwaOverall.toLocaleString('id-ID')}
                </span>
                <span className="text-sm font-semibold text-gray-500">Jiwa</span>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <ProgressBar
                  label="Dusun Krajan"
                  count={posyanduList.filter(p => p.dusun.includes('KRAJAN')).reduce((a, b) => a + b.totalJiwa, 0)}
                  maxCount={Math.max(totalJiwaOverall, 1)}
                  showPercentage={true}
                  barColor="bg-[#1d4ed8]"
                  height="h-2.5"
                />
                <ProgressBar
                  label="Dusun Gumuk Bago"
                  count={posyanduList.filter(p => p.dusun.includes('GUMUK')).reduce((a, b) => a + b.totalJiwa, 0)}
                  maxCount={Math.max(totalJiwaOverall, 1)}
                  showPercentage={true}
                  barColor="bg-[#047857]"
                  height="h-2.5"
                />
              </div>
            </div>
          </motion.div>

          {/* Card Kanan: Distribusi Kelompok Rentan Bencana DB */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs"
          >
            <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-4">
              DISTRIBUSI KELOMPOK RENTAN BENCANA
            </span>

            <div className="grid grid-cols-1 gap-3">
              <ProgressBar label="Bayi (0-2 th)" count={totalBayi} maxCount={Math.max(totalJiwaOverall, 1)} barColor="bg-[#1d4ed8]" height="h-2.5" />
              <ProgressBar label="Balita (2-5 th)" count={totalBalita} maxCount={Math.max(totalJiwaOverall, 1)} barColor="bg-[#1d4ed8]" height="h-2.5" />
              <ProgressBar label="Ibu Hamil" count={totalIbuHamil} maxCount={Math.max(totalJiwaOverall, 1)} barColor="bg-[#1d4ed8]" height="h-2.5" />
              <ProgressBar label="Ibu Menyusui" count={totalIbuMenyusui} maxCount={Math.max(totalJiwaOverall, 1)} barColor="bg-[#1d4ed8]" height="h-2.5" />
              <ProgressBar label="Lansia (>60 Tahun)" count={totalLansia} maxCount={Math.max(totalJiwaOverall, 1)} barColor="bg-[#1d4ed8]" height="h-2.5" />
              <ProgressBar label="Disabilitas" count={totalDisabilitas} maxCount={Math.max(totalJiwaOverall, 1)} barColor="bg-[#1d4ed8]" height="h-2.5" />
            </div>
          </motion.div>

        </div>

        {/* 2. Tab Filter Dusun */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {dusunTabs.map((tab) => {
            const isActive = selectedDusun === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDusun(tab.id)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1d4ed8] text-white shadow-md'
                    : 'bg-blue-100/70 hover:bg-blue-200/80 text-[#1e3a8a]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* 3. Posyandu Breakdown Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredList.length === 0 ? (
              <div className="col-span-full bg-white p-8 rounded-2xl text-center text-gray-400 border border-gray-200">
                Data posyandu sedang dimuat atau belum tersedia.
              </div>
            ) : (
              filteredList.map((posyandu, idx) => {
                const isLastSingle = idx === filteredList.length - 1 && filteredList.length % 2 !== 0;

                return (
                  <motion.div
                    key={posyandu.id_posyandu}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs ${
                      isLastSingle ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''
                    }`}
                  >
                    <div className="mb-4 pb-2 border-b border-gray-100 flex justify-between items-center gap-2">
                      <h3 className="font-extrabold text-gray-900 text-sm tracking-wide uppercase flex items-center gap-1.5 flex-wrap">
                        <span>{posyandu.name}</span>
                        <span className="text-gray-500 font-semibold normal-case"> - {posyandu.dusun}</span>
                      </h3>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full shrink-0">
                        {posyandu.totalJiwa} Jiwa
                      </span>
                    </div>

                    <div className="space-y-3">
                      <ProgressBar label="Bayi (0-2 th)" count={posyandu.bayi} maxCount={Math.max(posyandu.totalJiwa, 1)} barColor="bg-[#1d4ed8]" height="h-2" />
                      <ProgressBar label="Balita (2-5 th)" count={posyandu.balita} maxCount={Math.max(posyandu.totalJiwa, 1)} barColor="bg-[#1d4ed8]" height="h-2" />
                      <ProgressBar label="Ibu Hamil" count={posyandu.ibuHamil} maxCount={Math.max(posyandu.totalJiwa, 1)} barColor="bg-[#1d4ed8]" height="h-2" />
                      <ProgressBar label="Ibu Menyusui" count={posyandu.ibuMenyusui} maxCount={Math.max(posyandu.totalJiwa, 1)} barColor="bg-[#1d4ed8]" height="h-2" />
                      <ProgressBar label="Lansia (>60 Tahun)" count={posyandu.lansia} maxCount={Math.max(posyandu.totalJiwa, 1)} barColor="bg-[#1d4ed8]" height="h-2" />
                      <ProgressBar label="Disabilitas" count={posyandu.disabilitas} maxCount={Math.max(posyandu.totalJiwa, 1)} barColor="bg-[#1d4ed8]" height="h-2" />
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
