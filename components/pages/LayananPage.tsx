'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2, Download, ExternalLink, Leaf, Home, ShieldAlert, Radio, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LayananPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 sm:py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            Program Unggulan
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Layanan Desa: <span className="text-[#1d4ed8]">Program LIMA-SI</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Inisiatif komprehensif Desa Nogosari dalam membangun ketangguhan komunitas terhadap bencana melalui edukasi, inklusivitas, manajemen lingkungan, dan infrastruktur perlindungan terpadu.
          </p>
        </div>

        {/* 5 Sub-programs Sections */}
        <div className="space-y-16 sm:space-y-24">

          {/* 1. SI-Kencana */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">SI-Kencana</h2>
              <p className="text-sm font-bold text-blue-700 mb-4">
                Strategi Edukasi dan Kesiapsiagaan Bencana
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Program ini berfokus pada peningkatan kapasitas masyarakat melalui edukasi terstruktur. Kami menyediakan modul pelatihan, simulasi rutin, dan sosialisasi mitigasi bencana untuk memastikan setiap warga siap dan tanggap menghadapi kondisi darurat.
              </p>

              <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Penyusunan Modul Mitigasi Bencana Lokal</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Simulasi Evakuasi Berkala di Tingkat RT/RW</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Edukasi Kesiapsiagaan di Sekolah Desa</span>
                </li>
              </ul>

              <button className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all">
                <Download className="h-4 w-4" />
                Unduh Modul Panduan
              </button>
            </div>

            {/* Right Book Image Card */}
            <div className="lg:col-span-6 order-1 lg:order-2 bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm overflow-hidden flex items-center justify-center">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop"
                  alt="Modul Praktis Bencana"
                  className="object-cover rounded-lg shadow-md max-h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* 2. SI-Care */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Image Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm overflow-hidden flex items-center justify-center">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-rose-50 flex items-center justify-center p-4">
                {/* Signboard Illustration / Real image mock */}
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
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">SI-Care</h2>
              <p className="text-sm font-bold text-blue-700 mb-4">
                Sistem Identifikasi Kelompok Rentan
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Sistem identifikasi dan pemasangan label prioritas pada rumah kelompok rentan untuk memastikan mereka mendapat prioritas utama saat evakuasi darurat.
              </p>

              <Link
                href="/data"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all"
              >
                Lihat Data SI-Care
              </Link>
            </div>
          </motion.div>

          {/* 3. SI-Rasa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">SI-Rasa</h2>
              <p className="text-sm font-bold text-blue-700 mb-4">
                Sistem Rumah Aman Sampah
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Mengelola risiko lingkungan dengan pemilahan sampah yang tepat. Program ini bertujuan mewujudkan Zero Waste Village dengan mengedukasi warga tentang 5 kategori utama sampah.
              </p>

              <div className="inline-flex items-center gap-2 rounded-xl bg-[#6ee7b7] px-5 py-3 text-xs sm:text-sm font-extrabold text-emerald-950 shadow-sm">
                <Leaf className="h-4 w-4" />
                Target Zero Waste Village
              </div>
            </div>

            {/* Right Card: 5 Kategori Pemilahan */}
            <div className="lg:col-span-6 order-1 lg:order-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
              <h3 className="text-center font-extrabold text-gray-900 text-base mb-6">
                5 Kategori Pemilahan
              </h3>

              <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
                {/* Organik */}
                <div className="bg-emerald-600 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-sm">
                  <Leaf className="h-5 w-5" />
                  <span className="text-[10px] font-extrabold tracking-wider uppercase">ORGANIK</span>
                </div>

                {/* Anorganik */}
                <div className="bg-amber-500 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-sm">
                  <span className="text-base font-extrabold">♻</span>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase">ANORGANIK</span>
                </div>

                {/* B3 */}
                <div className="bg-rose-600 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-sm">
                  <ShieldAlert className="h-5 w-5" />
                  <span className="text-[10px] font-extrabold tracking-wider uppercase">B3</span>
                </div>

                {/* Kertas */}
                <div className="bg-blue-600 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-sm">
                  <span className="text-base font-extrabold">📄</span>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase">KERTAS</span>
                </div>

                {/* Residu */}
                <div className="bg-gray-700 text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px] shadow-sm">
                  <span className="text-base font-extrabold">🗑</span>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase">RESIDU</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. SI-Larung */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Shelter Image */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
                  alt="Rumah Lindung Darurat"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">SI-Larung</h2>
              <p className="text-sm font-bold text-blue-700 mb-4">
                Sistem Evakuasi dan Layanan Adaptif Rumah Lindung
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Penyediaan titik kumpul dan shelter sementara yang terintegrasi dengan layanan kesehatan. Dilengkapi ketahanan pangan mandiri melalui budidaya ikan dan sayuran dengan sistem aquaponik.
              </p>

              <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-blue-600 shrink-0" />
                  <span>Infrastruktur Rumah Lindung Darurat</span>
                </li>
                <li className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Budidaya Sayuran & Hidroponik Mandiri</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all">
                  Lihat Modul Praktis
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-blue-100/80 hover:bg-blue-200 text-blue-900 px-5 py-3 text-xs sm:text-sm font-bold transition-all">
                  <MapPin className="h-4 w-4 text-blue-700" />
                  Lokasi Rumah Lindung
                </button>
              </div>
            </div>
          </motion.div>

          {/* 5. SI-Tanggap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">SI-Tanggap</h2>
              <p className="text-sm font-bold text-blue-700 mb-4">
                Sistem Monitoring dan Peringatan Dini Bencana
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                SI-Tanggap merupakan sistem monitoring kondisi lingkungan desa secara real-time melalui sensor IoT untuk mendeteksi potensi ketinggian air sungai, kondisi cuaca, dan memberikan peringatan dini yang akurat bagi seluruh warga desa.
              </p>

              <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Monitoring Ketinggian Air Sungai 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Notifikasi Peringatan Dini Otomatis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Visualisasi Data Sensor IoT Real-time</span>
                </li>
              </ul>

              <Link
                href="/monitoring"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all"
              >
                <Radio className="h-4 w-4" />
                Lihat Dashboard Monitoring
              </Link>
            </div>

            {/* Right IoT River Station Image */}
            <div className="lg:col-span-6 order-1 lg:order-2 bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop"
                  alt="Stasiun IoT Sensor Sungai Nogosari"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
