'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  CheckCircle2, Download, ExternalLink, Leaf, Home,
  ShieldAlert, Radio, MapPin, ChevronDown, BookOpen
} from 'lucide-react';

// ==========================================
// TYPESCRIPT INTERFACES
// ==========================================
export interface ActionButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'success';
  icon?: 'Download' | 'ExternalLink' | 'Leaf' | 'Radio' | 'MapPin' | 'BookOpen';
}

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  badge?: string;
  actionButtons: ActionButton[];
  mediaType: 'image' | 'si-care-board' | 'si-rasa-categories';
  imageUrl?: string;
  imageAlt?: string;
}

// ==========================================
// MOCK DATA: 5 PROGRAM LIMA-SI
// ==========================================
const limasiPrograms: ProgramItem[] = [
  {
    id: 'si-kencana',
    title: 'SI-Kencana',
    subtitle: 'Strategi Edukasi dan Kesiapsiagaan Bencana',
    description:
      'Program ini berfokus pada peningkatan kapasitas masyarakat melalui edukasi terstruktur. Kami menyediakan modul pelatihan, simulasi rutin, dan sosialisasi mitigasi bencana untuk memastikan setiap warga siap dan tanggap menghadapi kondisi darurat.',
    features: [
      'Penyusunan Modul Mitigasi Bencana Lokal',
      'Simulasi Evakuasi Berkala di Tingkat RT/RW',
      'Edukasi Kesiapsiagaan di Sekolah Desa',
    ],
    actionButtons: [
      {
        label: 'Unduh Modul Panduan',
        href: '#',
        variant: 'primary',
        icon: 'Download',
      },
    ],
    mediaType: 'image',
    imageUrl:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
    imageAlt: 'Modul Praktis & E-book Mitigasi Bencana',
  },
  {
    id: 'si-care',
    title: 'SI-Care',
    subtitle: 'Sistem Identifikasi Kelompok Rentan',
    description:
      'Sistem identifikasi dan pemasangan label prioritas pada rumah kelompok rentan untuk memastikan mereka mendapat prioritas utama saat evakuasi darurat.',
    actionButtons: [
      {
        label: 'Lihat Data SI-Care',
        href: '/data',
        variant: 'primary',
        icon: 'ExternalLink',
      },
    ],
    mediaType: 'si-care-board',
  },
  {
    id: 'si-rasa',
    title: 'SI-Rasa',
    subtitle: 'Sistem Rumah Aman Sampah',
    description:
      'Mengelola risiko lingkungan dengan pemilahan sampah yang tepat. Program ini bertujuan mewujudkan Zero Waste Village dengan mengedukasi warga tentang 5 kategori utama sampah.',
    badge: 'Target Zero Waste Village',
    actionButtons: [
      {
        label: 'Target Zero Waste Village',
        href: '#',
        variant: 'success',
        icon: 'Leaf',
      },
    ],
    mediaType: 'si-rasa-categories',
  },
  {
    id: 'si-larung',
    title: 'SI-Larung',
    subtitle: 'Sistem Evakuasi dan Layanan Adaptif Rumah Lindung',
    description:
      'Penyediaan titik kumpul dan shelter sementara yang terintegrasi dengan layanan kesehatan. Dilengkapi ketahanan pangan mandiri melalui budidaya ikan dan sayuran dengan sistem aquaponik.',
    features: [
      'Infrastruktur Rumah Lindung Darurat',
      'Budidaya Sayuran & Hidroponik Mandiri',
    ],
    actionButtons: [
      {
        label: 'Lihat Modul Praktis',
        href: '#',
        variant: 'primary',
        icon: 'BookOpen',
      },
      {
        label: 'Lokasi Rumah Lindung',
        href: '#',
        variant: 'secondary',
        icon: 'MapPin',
      },
    ],
    mediaType: 'image',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    imageAlt: 'Rumah Lindung Darurat Desa Nogosari',
  },
  {
    id: 'si-tanggap',
    title: 'SI-Tanggap',
    subtitle: 'Sistem Monitoring dan Peringatan Dini Bencana',
    description:
      'SI-Tanggap merupakan sistem monitoring kondisi lingkungan desa secara real-time melalui sensor IoT untuk mendeteksi potensi ketinggian air sungai, kondisi cuaca, dan memberikan peringatan dini yang akurat bagi seluruh warga desa.',
    features: [
      'Monitoring Ketinggian Air Sungai 24/7',
      'Notifikasi Peringatan Dini Otomatis',
      'Visualisasi Data Sensor IoT Real-time',
    ],
    actionButtons: [
      {
        label: 'Lihat Dashboard Monitoring',
        href: '/monitoring',
        variant: 'primary',
        icon: 'Radio',
      },
    ],
    mediaType: 'image',
    imageUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop',
    imageAlt: 'Stasiun Sensor IoT Sungai Nogosari',
  },
];

// Helper to render dynamic action button icons
function renderIcon(iconName?: string) {
  switch (iconName) {
    case 'Download':
      return <Download className="h-4 w-4" />;
    case 'ExternalLink':
      return <ExternalLink className="h-4 w-4" />;
    case 'Leaf':
      return <Leaf className="h-4 w-4" />;
    case 'Radio':
      return <Radio className="h-4 w-4" />;
    case 'MapPin':
      return <MapPin className="h-4 w-4" />;
    case 'BookOpen':
      return <BookOpen className="h-4 w-4" />;
    default:
      return null;
  }
}

// Framer Motion Animation Variants
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

export default function LayananPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-gray-900 overflow-x-hidden">
      {/* ==================================================== */}
      {/* SECTION A: HERO SECTION (FULL HEIGHT & STAGGERED ENTRY) */}
      {/* ==================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 md:px-8 text-center max-w-4xl mx-auto pt-8 pb-16">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-6"
        >
          {/* Badge */}
          <motion.div variants={heroItemVariants}>
            <span className="inline-block bg-blue-100/90 text-[#1d4ed8] text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full border border-blue-200/60 shadow-xs">
              Program Unggulan
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-gray-900"
          >
            Layanan Desa: <span className="text-[#1d4ed8]">Program LIMA-SI</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl font-normal"
          >
            Inisiatif komprehensif Desa Nogosari dalam membangun ketangguhan komunitas terhadap bencana melalui edukasi, inklusivitas, manajemen lingkungan, dan infrastruktur perlindungan terpadu.
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
          className="absolute bottom-6 flex flex-col items-center gap-1.5 text-xs text-gray-400 font-semibold cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 80,
              behavior: 'smooth',
            });
          }}
        >
          <span>Gulir untuk Jelajahi Program</span>
          <ChevronDown className="h-5 w-5 text-blue-600" />
        </motion.div>
      </section>

      {/* ==================================================== */}
      {/* SECTION B: CONTENT SECTION (ZIG-ZAG LAYOUT & SCROLL REVEAL) */}
      {/* ==================================================== */}
      <section className="py-16 sm:py-24 border-t border-gray-200/60">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-24 sm:space-y-32">
          {limasiPrograms.map((program, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px 0px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* TEXT CONTENT COLUMN */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                  }`}
                >
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
                    {program.title}
                  </h2>
                  <p className="text-sm font-bold text-[#1d4ed8] mb-4">
                    {program.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal">
                    {program.description}
                  </p>

                  {/* Bullet Features (If present) */}
                  {program.features && program.features.length > 0 && (
                    <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-700 font-medium">
                      {program.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5">
                    {program.actionButtons.map((btn, idx) => {
                      const isSecondary = btn.variant === 'secondary';
                      const isSuccess = btn.variant === 'success';

                      if (isSuccess) {
                        return (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#6ee7b7] px-5 py-3 text-xs sm:text-sm font-extrabold text-emerald-950 shadow-xs"
                          >
                            {renderIcon(btn.icon)}
                            <span>{btn.label}</span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={idx}
                          href={btn.href}
                          className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-xs sm:text-sm font-extrabold transition-all shadow-xs hover:shadow-md ${
                            isSecondary
                              ? 'bg-blue-100/80 hover:bg-blue-200 text-blue-900'
                              : 'bg-[#1d4ed8] hover:bg-blue-800 text-white'
                          }`}
                        >
                          {renderIcon(btn.icon)}
                          <span>{btn.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* MEDIA / VISUAL COLUMN */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs overflow-hidden flex items-center justify-center">
                    {/* Media Type 1: Image */}
                    {program.mediaType === 'image' && (
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={program.imageUrl}
                          alt={program.imageAlt || program.title}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}

                    {/* Media Type 2: SI-Care Board */}
                    {program.mediaType === 'si-care-board' && (
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-rose-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-md bg-white border-4 border-rose-600 rounded-xl p-4 shadow-lg text-center">
                          <div className="bg-rose-600 text-white font-extrabold text-xs sm:text-sm py-1.5 px-3 rounded mb-3 uppercase tracking-wider">
                            RUMAH PRIORITAS EVAKUASI KELOMPOK RENTAN BENCANA
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-800">
                            <div className="p-2 border rounded bg-gray-50">BAYI</div>
                            <div className="p-2 border rounded bg-gray-50">IBU MENYUSUI</div>
                            <div className="p-2 border rounded bg-gray-50">BALITA</div>
                            <div className="p-2 border rounded bg-gray-50">LANSIA</div>
                            <div className="p-2 border rounded bg-gray-50">IBU HAMIL</div>
                            <div className="p-2 border rounded bg-gray-50">DISABILITAS</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Media Type 3: SI-Rasa Categories */}
                    {program.mediaType === 'si-rasa-categories' && (
                      <div className="w-full py-4">
                        <h3 className="text-center font-extrabold text-gray-900 text-base mb-6">
                          5 Kategori Pemilahan
                        </h3>
                        <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
                          <div className="bg-emerald-600 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-xs">
                            <Leaf className="h-5 w-5" />
                            <span className="text-[10px] font-extrabold tracking-wider uppercase">
                              ORGANIK
                            </span>
                          </div>
                          <div className="bg-amber-500 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-xs">
                            <span className="text-base font-extrabold">♻</span>
                            <span className="text-[10px] font-extrabold tracking-wider uppercase">
                              ANORGANIK
                            </span>
                          </div>
                          <div className="bg-rose-600 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-xs">
                            <ShieldAlert className="h-5 w-5" />
                            <span className="text-[10px] font-extrabold tracking-wider uppercase">
                              B3
                            </span>
                          </div>
                          <div className="bg-blue-600 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-xs">
                            <span className="text-base font-extrabold">📄</span>
                            <span className="text-[10px] font-extrabold tracking-wider uppercase">
                              KERTAS
                            </span>
                          </div>
                          <div className="bg-gray-700 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-xs">
                            <span className="text-base font-extrabold">🗑</span>
                            <span className="text-[10px] font-extrabold tracking-wider uppercase">
                              RESIDU
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
