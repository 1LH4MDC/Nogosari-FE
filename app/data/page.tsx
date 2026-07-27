'use client';

import React from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// ==========================================
// TYPESCRIPT INTERFACES
// ==========================================
export interface PosyanduData {
  id: string;
  name: string;
  dusun: string;
  bayi: number;
  balita: number;
  ibuHamil: number;
  ibuMenyusui: number;
  lansia: number;
  disabilitas: number;
}

export interface AnimatedProgressBarProps {
  label: string;
  count: number;
  maxCount?: number;
  unit?: string;
  barColor?: string;
  height?: string;
  showPercentage?: boolean;
}

// ==========================================
// MOCK DATA: 5 POSYANDU DUSUN
// ==========================================
const posyanduList: PosyanduData[] = [
  {
    id: 'p59',
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
    id: 'p60',
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
    id: 'p61',
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
    id: 'p62',
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
    id: 'p63',
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

// ==========================================
// REUSABLE COMPONENT: ANIMATED PROGRESS BAR
// ==========================================
function AnimatedProgressBar({
  label,
  count,
  maxCount = 2500,
  unit = 'Jiwa',
  barColor = 'bg-blue-600',
  height = 'h-2.5',
  showPercentage = false,
}: AnimatedProgressBarProps) {
  const percentage = Math.min(Math.round((count / maxCount) * 100), 100);

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
        <span>{label}</span>
        <span className="text-gray-500 font-medium">
          {count.toLocaleString('id-ID')} {unit}
          {showPercentage && ` (${percentage}%)`}
        </span>
      </div>
      <div className={`w-full bg-blue-50 rounded-full overflow-hidden ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`${barColor} ${height} rounded-full`}
        />
      </div>
    </div>
  );
}

// Framer Motion Variants for Staggered Hero Entry
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function DataPage() {
  return (
    <div className="bg-[#f4f7fb] min-h-screen text-gray-900 overflow-x-hidden">
      {/* ==================================================== */}
      {/* INITIAL VIEW / HERO SUMMARY SECTION (ABOVE THE FOLD) */}
      {/* ==================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between container mx-auto px-4 md:px-8 max-w-6xl py-8 sm:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col justify-center space-y-8"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-2">
                Transparansi Data Kelompok Rentan
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed font-normal">
                Data kelompok rentan ini diambil berdasarkan data riil dari 5 dusun yang ada di Desa Nogosari, Kecamatan Rambipuji, Jember.
              </p>
            </div>

            {/* Last Updated Badge */}
            <div className="self-start md:self-auto shrink-0 flex items-center gap-2 bg-blue-50/90 border border-blue-100/90 text-blue-800 text-xs font-bold px-4 py-2 rounded-full shadow-xs">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Last updated: Aug 24, 2026</span>
            </div>
          </motion.div>

          {/* Dashboard Summary Cards (2 Grid Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card Left: Total Penduduk */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/70 shadow-xs relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-blue-50/70 -z-0" />

              <div className="relative z-10">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
                  TOTAL PENDUDUK
                </span>
                <div className="flex items-baseline gap-2 mt-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#1d4ed8]">
                    22.000
                  </span>
                  <span className="text-sm font-bold text-gray-500">Jiwa</span>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <AnimatedProgressBar
                    label="Laki-laki"
                    count={2100}
                    maxCount={4260}
                    showPercentage={true}
                    barColor="bg-blue-600"
                    height="h-2.5"
                  />
                  <AnimatedProgressBar
                    label="Perempuan"
                    count={2160}
                    maxCount={4260}
                    showPercentage={true}
                    barColor="bg-emerald-700"
                    height="h-2.5"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card Right: Distribusi Kelompok Rentan Bencana */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/70 shadow-xs"
            >
              <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-4">
                DISTRIBUSI KELOMPOK RENTAN BENCANA
              </span>

              <div className="grid grid-cols-1 gap-3.5">
                <AnimatedProgressBar label="Bayi (0-2 th)" count={850} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
                <AnimatedProgressBar label="Balita (2-5 th)" count={850} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
                <AnimatedProgressBar label="Ibu Hamil" count={680} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
                <AnimatedProgressBar label="Ibu Menyusui" count={1910} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
                <AnimatedProgressBar label="Lansia (>60 Tahun)" count={1910} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
                <AnimatedProgressBar label="Disabilitas" count={810} maxCount={2500} barColor="bg-blue-600" height="h-2.5" />
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll Indicator Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 0.8, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className="pt-6 pb-2 flex flex-col items-center gap-1.5 text-xs text-gray-400 font-semibold cursor-pointer self-center"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 80,
              behavior: 'smooth',
            });
          }}
        >
          <span>Gulir untuk Lihat Breakdown Per Posyandu</span>
          <ChevronDown className="h-5 w-5 text-blue-600" />
        </motion.div>
      </section>

      {/* ==================================================== */}
      {/* SCROLL VIEW / POSYANDU BREAKDOWN SECTION (GRID 2 COL) */}
      {/* ==================================================== */}
      <section className="py-16 sm:py-24 border-t border-gray-200/60">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Rincian Data Per-Posyandu Dusun
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Data pemetaan distribusi kelompok rentan di masing-masing Posyandu Desa Nogosari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posyanduList.map((posyandu, idx) => {
              const isLastSingle = idx === posyanduList.length - 1 && posyanduList.length % 2 !== 0;

              return (
                <motion.div
                  key={posyandu.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px 0px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: (idx % 2) * 0.15 }}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/70 shadow-xs ${
                    isLastSingle ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''
                  }`}
                >
                  <div className="mb-5 pb-3 border-b border-gray-100">
                    <h3 className="font-extrabold text-gray-900 text-sm tracking-wide uppercase">
                      {posyandu.name} - <span className="text-gray-500 font-semibold">{posyandu.dusun}</span>
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    <AnimatedProgressBar label="Bayi (0-2 th)" count={posyandu.bayi} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                    <AnimatedProgressBar label="Balita (2-5 th)" count={posyandu.balita} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                    <AnimatedProgressBar label="Ibu Hamil" count={posyandu.ibuHamil} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                    <AnimatedProgressBar label="Ibu Menyusui" count={posyandu.ibuMenyusui} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                    <AnimatedProgressBar label="Lansia (>60 Tahun)" count={posyandu.lansia} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                    <AnimatedProgressBar label="Disabilitas" count={posyandu.disabilitas} maxCount={2000} barColor="bg-blue-600" height="h-2" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
