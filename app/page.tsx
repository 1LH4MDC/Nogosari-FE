'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Droplet, CheckCircle2, AlertTriangle, XCircle, PhoneCall, ChevronDown
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// ==========================================
// TYPESCRIPT INTERFACES
// ==========================================
export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export interface EvacuationPost {
  id: string;
  name: string;
}

// ==========================================
// MOCK DATA
// ==========================================
const emergencyContacts: EmergencyContact[] = [
  { id: 'c1', name: 'Fiqih', role: 'Ketua Destana', phone: '081234567890' },
  { id: 'c2', name: 'Hadi', role: 'Kasi Pemerintahan', phone: '081234567891' },
  { id: 'c3', name: 'Sutrisno', role: 'Destana Gumuk Bago', phone: '081234567892' },
  { id: 'c4', name: 'Sohib', role: 'Destana Krajan', phone: '081234567893' },
  { id: 'c5', name: 'Sofyan', role: 'Destana Krajan', phone: '081234567894' },
];

const evacuationPosts: EvacuationPost[] = [
  { id: 'pos1', name: 'Rumah Reza' },
  { id: 'pos2', name: 'Rumah Ilham' },
  { id: 'pos3', name: 'Rumah Bagas' },
];

// ==========================================
// FRAMER MOTION VARIANTS
// ==========================================
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function HomePage() {
  // Real-time IoT Water Sensor State (Simulated Polling/WebSocket ready)
  const [waterLevelCm, setWaterLevelCm] = useState(69);

  useEffect(() => {
    // Simulated minor sensor fluctuations
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      setWaterLevelCm((prev) => Math.max(50, Math.min(180, prev + delta)));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (cm: number) => {
    const meters = cm / 100;
    if (meters < 2.0) {
      return {
        label: 'NORMAL',
        bgColor: 'bg-[#6ee7b7]',
        textColor: 'text-emerald-950',
      };
    } else if (meters <= 3.0) {
      return {
        label: 'WASPADA',
        bgColor: 'bg-amber-300',
        textColor: 'text-amber-950',
      };
    } else {
      return {
        label: 'BAHAYA',
        bgColor: 'bg-rose-400',
        textColor: 'text-rose-950',
      };
    }
  };

  const statusConfig = getStatusConfig(waterLevelCm);

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      {/* ==================================================== */}
      {/* SECTION 1: HERO SECTION (ABOVE THE FOLD) */}
      {/* ==================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
        </div>

        {/* Hero Content */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white max-w-4xl py-16 flex flex-col items-center space-y-6"
        >
          <motion.h1
            variants={heroItemVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md leading-tight"
          >
            Selamat Datang di <br />
            <span className="text-blue-200">Desa Nogosari Tangguh Bencana</span>
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-xl text-gray-100 max-w-3xl leading-relaxed font-normal opacity-95"
          >
            Mewujudkan Desa Nogosari sebagai Desa Konservasi dan Tangguh Bencana melalui Integrasi Program LIMA-SI berbasis IoT dan berkelanjutan
          </motion.p>
        </motion.div>

        {/* Scroll Indicator Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className="absolute bottom-6 z-10 flex flex-col items-center gap-1 text-xs text-white/80 font-semibold cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 80,
              behavior: 'smooth',
            });
          }}
        >
          <span>Gulir ke Bawah</span>
          <ChevronDown className="h-5 w-5 text-blue-300" />
        </motion.div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 2: INFORMASI DESA TANGGUH BENCANA */}
      {/* ==================================================== */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
              Informasi Desa Tangguh Bencana
            </h2>
          </motion.div>

          {/* A. Real-Time Water Level Banner (IoT Status) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
            className={`w-full rounded-2xl ${statusConfig.bgColor} p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between shadow-xs gap-4 transition-all duration-500`}
          >
            <span className={`text-sm sm:text-base font-extrabold uppercase tracking-widest ${statusConfig.textColor}`}>
              KETINGGIAN AIR
            </span>

            <div className={`flex items-center gap-3 font-extrabold ${statusConfig.textColor}`}>
              <Droplet className="h-7 w-7 fill-current" />
              <span className="text-2xl sm:text-3xl">{waterLevelCm} cm</span>
            </div>

            <span className={`text-xl sm:text-2xl font-extrabold tracking-wider ${statusConfig.textColor}`}>
              {statusConfig.label}
            </span>
          </motion.div>

          {/* B. Disaster Alert Grid (3 Grid Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Card 1: Indikator Ambang Batas */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
            >
              <h3 className="font-extrabold text-gray-900 text-lg mb-6">
                Indikator Ambang Batas
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-gray-800 text-sm">Normal</span>
                  </div>
                  <span className="font-bold text-gray-700 text-sm">&lt; 2.0 m</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-gray-800 text-sm">Waspada</span>
                  </div>
                  <span className="font-bold text-gray-700 text-sm">2.0 - 3.0 m</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-100/70 border border-rose-200/80">
                  <div className="flex items-center gap-2.5">
                    <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                    <span className="font-bold text-rose-900 text-sm">Bahaya</span>
                  </div>
                  <span className="font-bold text-rose-900 text-sm">&gt; 4.0 m</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Tindak Evakuasi */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
            >
              <h3 className="font-extrabold text-gray-900 text-lg mb-6">
                Tindak Evakuasi
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-gray-800 text-sm">Aman</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-gray-800 text-sm">Mulai persiapkan diri</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-100/70 border border-rose-200/80">
                  <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                  <span className="font-bold text-rose-900 text-sm">Segera evakuasi</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Posko Evakuasi */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
            >
              <h3 className="font-extrabold text-gray-900 text-lg mb-6">
                Posko Evakuasi
              </h3>

              <div className="space-y-3.5">
                {evacuationPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center p-3.5 rounded-xl bg-blue-50/60 border-l-4 border-blue-600"
                  >
                    <span className="font-bold text-gray-800 text-sm ml-2">{post.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ==================================================== */}
          {/* SECTION 3: KONTAK DARURAT SECTION */}
          {/* ==================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
            className="text-center pt-4"
          >
            <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] mb-8">
              <PhoneCall className="h-7 w-7 text-blue-700" />
              <span>Kontak Darurat</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {emergencyContacts.map((contact) => (
                <a
                  key={contact.id}
                  href={`tel:${contact.phone}`}
                  className="rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition-all duration-200"
                >
                  {contact.name} - {contact.role}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
