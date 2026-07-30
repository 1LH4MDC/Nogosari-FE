'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import ProgressBar from '@/components/common/ProgressBar';

interface PosyanduData {
  name: string;
  dusun: string;
  bayi: number;
  balita: number;
  ibuHamil: number;
  ibuMenyusui: number;
  lansia: number;
  disabilitas: number;
}

const posyanduList: PosyanduData[] = [
  {
    name: 'POSYANDU BOUGENVILLE 59',
    dusun: 'KRAJAN',
    bayi: 850,
    balita: 850,
    ibuHamil: 680,
    ibuMenyusui: 1910,
    lansia: 1910,
    disabilitas: 5,
  },
  {
    name: 'POSYANDU BOUGENVILLE 60',
    dusun: 'KRAJAN',
    bayi: 850,
    balita: 850,
    ibuHamil: 680,
    ibuMenyusui: 1910,
    lansia: 1910,
    disabilitas: 810,
  },
  {
    name: 'POSYANDU BOUGENVILLE 61',
    dusun: 'KRAJAN',
    bayi: 850,
    balita: 850,
    ibuHamil: 680,
    ibuMenyusui: 1910,
    lansia: 1910,
    disabilitas: 810,
  },
  {
    name: 'POSYANDU BOUGENVILLE 62',
    dusun: 'GUMUK BAGO',
    bayi: 850,
    balita: 850,
    ibuHamil: 680,
    ibuMenyusui: 1910,
    lansia: 1910,
    disabilitas: 810,
  },
  {
    name: 'POSYANDU BOUGENVILLE 63',
    dusun: 'GUMUK BAGO',
    bayi: 6,
    balita: 850,
    ibuHamil: 680,
    ibuMenyusui: 1910,
    lansia: 1910,
    disabilitas: 810,
  },
];

const dusunTabs = [
  { id: 'ALL', label: 'Semua' },
  { id: 'KRAJAN', label: 'Dusun Krajan' },
  { id: 'GUMUK BAGO', label: 'Dusun Gumuk Bago' },
];

export default function DataPage() {
  const [selectedDusun, setSelectedDusun] = useState('ALL');

  const filteredList = selectedDusun === 'ALL'
    ? posyanduList
    : posyanduList.filter((item) => item.dusun === selectedDusun);

  return (
    <div className="bg-[#f4f7fb] min-h-screen py-10 sm:py-14">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Transparansi Data Kelompok Rentan
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
              Data kelompok rentan ini diambil berdasarkan data riil dari 5 dusun yang ada di Desa Nogosari, Kecamatan Rambipuji, Jember.
            </p>
          </div>

          <div className="self-start md:self-auto shrink-0 flex items-center gap-2 bg-blue-50/80 border border-blue-100 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Last updated: Aug 24, 2026</span>
          </div>
        </div>

        {/* Top Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">

          {/* Left Card: Total Penduduk */}
          <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-blue-50/60 -z-0" />

            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                TOTAL PENDUDUK
              </span>
              <div className="flex items-baseline gap-2 mt-2 mb-6">
                <span className="text-4xl font-extrabold text-[#1d4ed8]">22.000</span>
                <span className="text-sm font-semibold text-gray-500">Jiwa</span>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <ProgressBar
                  label="Laki-laki"
                  count={2100}
                  maxCount={4260}
                  showPercentage={true}
                  barColor="bg-blue-600"
                  height="h-2.5"
                />
                <ProgressBar
                  label="Perempuan"
                  count={2160}
                  maxCount={4260}
                  showPercentage={true}
                  barColor="bg-emerald-700"
                  height="h-2.5"
                />
              </div>
            </div>
          </div>

          {/* Right Card: Distribusi Kelompok Rentan */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-4">
              DISTRIBUSI KELOMPOK RENTAN BENCANA
            </span>

            <div className="grid grid-cols-1 gap-3">
              <ProgressBar label="Bayi (0-2 th)" count={850} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
              <ProgressBar label="Balita (2-5 th)" count={850} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
              <ProgressBar label="Ibu Hamil" count={680} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
              <ProgressBar label="Ibu Menyusui" count={1910} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
              <ProgressBar label="Lansia (>60 Tahun)" count={1910} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
              <ProgressBar label="Disabilitas" count={810} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
            </div>
          </div>

        </div>

        {/* Dusun Filter Tabs (Below Total Penduduk Summary) */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {dusunTabs.map((tab) => {
            const isActive = selectedDusun === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDusun(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive
                  ? 'bg-[#1d4ed8] text-white shadow-md'
                  : 'bg-blue-100/70 hover:bg-blue-200/80 text-[#1e3a8a]'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Posyandu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredList.map((posyandu, idx) => {
            const isLastSingle = idx === filteredList.length - 1 && filteredList.length % 2 !== 0;

            return (
              <div
                key={posyandu.name + idx}
                className={`bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm ${isLastSingle ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''
                  }`}
              >
                <div className="mb-4 pb-2 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm tracking-wide uppercase">
                    {posyandu.name} - <span className="text-gray-500">{posyandu.dusun}</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  <ProgressBar label="Bayi (0-2 th)" count={posyandu.bayi} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                  <ProgressBar label="Balita (2-5 th)" count={posyandu.balita} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                  <ProgressBar label="Ibu Hamil" count={posyandu.ibuHamil} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                  <ProgressBar label="Ibu Menyusui" count={posyandu.ibuMenyusui} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                  <ProgressBar label="Lansia (>60 Tahun)" count={posyandu.lansia} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                  <ProgressBar label="Disabilitas" count={posyandu.disabilitas} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
