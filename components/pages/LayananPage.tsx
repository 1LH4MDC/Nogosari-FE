'use client';

import Link from 'next/link';
import {
  CheckCircle2, Download, Leaf, Home, ShieldAlert, Radio, MapPin, BookOpen, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data Architecture for 5 Programs LIMA-SI
export interface ProgramData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets?: string[];
  primaryCta?: {
    text: string;
    href?: string;
    isDownload?: boolean;
    icon?: 'download' | 'link' | 'radio' | 'book';
  };
  secondaryCta?: {
    text: string;
    href?: string;
    icon?: 'map';
  };
  pillBadge?: string;
  mediaType: 'image' | 'categories' | 'shelter' | 'sensor';
  imageSrc?: string;
}

const limaSiPrograms: ProgramData[] = [
  {
    id: 'si-kencana',
    title: 'SI-Kencana',
    subtitle: 'Strategi Edukasi dan Kesiapsiagaan Bencana',
    description:
      'Program ini berfokus pada peningkatan kapasitas masyarakat melalui edukasi terstruktur. Kami menyediakan modul pelatihan, simulasi rutin, dan sosialisasi mitigasi bencana untuk memastikan setiap warga siap dan tanggap menghadapi kondisi darurat.',
    bullets: [
      'Penyusunan Modul Mitigasi Bencana Lokal',
      'Simulasi Evakuasi Berkala di Tingkat RT/RW',
      'Edukasi Kesiapsiagaan di Sekolah Desa',
    ],
    primaryCta: {
      text: 'Unduh Modul Panduan',
      isDownload: true,
      icon: 'download',
    },
    mediaType: 'image',
    imageSrc: '/si-kencana.webp',
  },
  {
    id: 'si-care',
    title: 'SI-Care',
    subtitle: 'Sistem Identifikasi Kelompok Rentan',
    description:
      'Sistem identifikasi dan pemasangan label prioritas pada rumah kelompok rentan untuk memastikan mereka mendapat prioritas utama saat evakuasi darurat.',
    primaryCta: {
      text: 'Lihat Data SI-Care',
      href: '/data',
      icon: 'link',
    },
    mediaType: 'image',
    imageSrc: '/si-care.webp',
  },
  {
    id: 'si-rasa',
    title: 'SI-Rasa',
    subtitle: 'Sistem Rumah Aman Sampah',
    description:
      'Mengelola risiko lingkungan dengan pemilahan sampah yang tepat. Program ini bertujuan mewujudkan Zero Waste Village dengan mengedukasi warga tentang 5 kategori utama sampah.',
    pillBadge: 'Target Zero Waste Village',
    mediaType: 'categories',
  },
  {
    id: 'si-larung',
    title: 'SI-Larung',
    subtitle: 'Sistem Evakuasi dan Layanan Adaptif Rumah Lindung',
    description:
      'Penyediaan titik kumpul dan shelter sementara yang terintegrasi dengan layanan kesehatan. Dilengkapi ketahanan pangan mandiri melalui budidaya ikan dan sayuran dengan sistem aquaponik.',
    bullets: [
      'Infrastruktur Rumah Lindung Darurat',
      'Budidaya Sayuran & Hidroponik Mandiri',
    ],
    primaryCta: {
      text: 'Lihat Modul Praktis',
      icon: 'book',
    },
    secondaryCta: {
      text: 'Lokasi Rumah Lindung',
      icon: 'map',
    },
    mediaType: 'shelter',
    imageSrc: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 'si-tanggap',
    title: 'SI-Tanggap',
    subtitle: 'Sistem Monitoring dan Peringatan Dini Bencana',
    description:
      'SI-Tanggap merupakan sistem monitoring kondisi lingkungan desa secara real-time melalui sensor IoT untuk mendeteksi potensi ketinggian air sungai, kondisi cuaca, dan memberikan peringatan dini yang akurat bagi seluruh warga desa.',
    bullets: [
      'Monitoring Ketinggian Air Sungai 24/7',
      'Notifikasi Peringatan Dini Otomatis',
      'Visualisasi Data Sensor IoT Real-time',
    ],
    primaryCta: {
      text: 'Lihat Dashboard Monitoring',
      href: '/monitoring',
      icon: 'radio',
    },
    mediaType: 'sensor',
    imageSrc: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop',
  },
];

export default function LayananPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">

      {/* 1. Hero Section (Full Viewport Below Navbar so SI-Kencana is hidden until scroll) */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-12 overflow-hidden border-b border-gray-100">
        {/* Subtle background glow element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Staggered Entry Animation on Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          >
            <span className="inline-block bg-blue-100/90 text-blue-800 text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-2xs">
              Program Unggulan
            </span>
          </motion.div>

          {/* Staggered Entry Animation on Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight sm:leading-snug mb-6"
          >
            Layanan Desa:{' '}
            <span className="text-[#1d4ed8] inline-block sm:inline whitespace-nowrap">
              Program LIMA-SI
            </span>
          </motion.h1>

          {/* Staggered Entry Animation on Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="text-base sm:text-xl text-gray-600 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Inisiatif komprehensif Desa Nogosari dalam membangun ketangguhan komunitas terhadap bencana melalui edukasi, inklusivitas, manajemen lingkungan, dan infrastruktur perlindungan terpadu.
          </motion.p>
        </div>
      </section>

      {/* 2. Content Section (5 Programs in Zig-Zag Layout with Scroll Reveal) */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-16 sm:space-y-24">
          {limaSiPrograms.map((program, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px 0px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-6 ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                    }`}
                >
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
                    {program.title}
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-[#1d4ed8] mb-4">
                    {program.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Bullet points if present */}
                  {program.bullets && program.bullets.length > 0 && (
                    <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-700 font-medium">
                      {program.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Pill badge if present */}
                  {program.pillBadge && (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-[#6ee7b7] px-5 py-3 text-xs sm:text-sm font-extrabold text-emerald-950 shadow-2xs mb-6">
                      <Leaf className="h-4 w-4 shrink-0" />
                      <span>{program.pillBadge}</span>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    {program.primaryCta && (
                      program.primaryCta.href ? (
                        <Link
                          href={program.primaryCta.href}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          {program.primaryCta.icon === 'radio' && <Radio className="h-4 w-4 shrink-0" />}
                          {program.primaryCta.icon === 'download' && <Download className="h-4 w-4 shrink-0" />}
                          <span>{program.primaryCta.text}</span>
                        </Link>
                      ) : (
                        <button className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition-all cursor-pointer">
                          {program.primaryCta.icon === 'download' && <Download className="h-4 w-4 shrink-0" />}
                          {program.primaryCta.icon === 'book' && <BookOpen className="h-4 w-4 shrink-0" />}
                          <span>{program.primaryCta.text}</span>
                        </button>
                      )
                    )}

                    {program.secondaryCta && (
                      <button className="inline-flex items-center gap-2 rounded-xl bg-blue-100/80 hover:bg-blue-200 text-blue-900 px-5 py-3.5 text-xs sm:text-sm font-bold transition-all cursor-pointer">
                        {program.secondaryCta.icon === 'map' && <MapPin className="h-4 w-4 text-blue-700 shrink-0" />}
                        <span>{program.secondaryCta.text}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Media / Visual Card Column */}
                <div
                  className={`lg:col-span-6 ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                    }`}
                >
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex items-center justify-center">

                    {/* Real Image Card (SI-Kencana & SI-Care) */}
                    {program.mediaType === 'image' && (
                      <div className="relative w-full rounded-xl overflow-hidden bg-white flex items-center justify-center p-2">
                        <img
                          src={program.imageSrc}
                          alt={program.title}
                          className="w-full h-auto object-contain max-h-[360px] rounded-lg"
                        />
                      </div>
                    )}

                    {/* Media Type 3: 5 Categories (SI-Rasa) */}
                    {program.mediaType === 'categories' && (
                      <div className="w-full py-2">
                        <h3 className="text-center font-extrabold text-gray-900 text-sm sm:text-base mb-5">
                          5 Kategori Pemilahan
                        </h3>
                        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 text-center">
                          <div className="bg-[#16a34a] text-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center gap-1 min-h-[85px] shadow-2xs">
                            <Leaf className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase">ORGANIK</span>
                          </div>
                          <div className="bg-[#eab308] text-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center gap-1 min-h-[85px] shadow-2xs">
                            <span className="text-xs sm:text-base font-extrabold">♻</span>
                            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase">ANORGANIK</span>
                          </div>
                          <div className="bg-[#dc2626] text-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center gap-1 min-h-[85px] shadow-2xs">
                            <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase">B3</span>
                          </div>
                          <div className="bg-[#2563eb] text-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center gap-1 min-h-[85px] shadow-2xs">
                            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase">KERTAS</span>
                          </div>
                          <div className="bg-[#374151] text-white rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center gap-1 min-h-[85px] shadow-2xs">
                            <Layers className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase">RESIDU</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Media Type 4 & 5: Image Shelter / Sensor (SI-Larung, SI-Tanggap) */}
                    {(program.mediaType === 'shelter' || program.mediaType === 'sensor') && (
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={program.imageSrc}
                          alt={program.title}
                          className="object-cover w-full h-full rounded-xl"
                        />
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


