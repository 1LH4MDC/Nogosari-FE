'use client';

import Link from 'next/link';
import { Droplet, CheckCircle2, AlertTriangle, XCircle, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getLatestSensorReading } from '@/lib/api';

interface EmergencyContact {
  name: string;
  phone: string;
}

const emergencyContacts: EmergencyContact[] = [
  { name: 'Fiqih - Ketua Destana', phone: 'tel:081234567891' },
  { name: 'Hadi - Kasi Pemerintahan', phone: 'tel:081234567892' },
  { name: 'Joko Sambang - Destana Gumuk Bago', phone: 'tel:081234567893' },
  { name: 'Sohib - RW Dusun Krajan', phone: 'tel:081234567894' },
  { name: 'Sofyan - RT Dusun Krajan', phone: 'tel:081234567895' },
];

export default function HomePage() {
  const [sensorData, setSensorData] = useState<{ reading?: number; status_water?: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getLatestSensorReading();
      if (data) setSensorData(data);
    }
    loadData();
    const interval = setInterval(loadData, 10000); // Polling every 10 sec
    return () => clearInterval(interval);
  }, []);

  const waterLevel = sensorData?.reading !== undefined ? `${sensorData.reading} cm` : '69 cm';
  const waterStatus = sensorData?.status_water ? sensorData.status_water.toUpperCase() : 'NORMAL';

  // Dynamic status banner styling based on IoT status
  const getBannerStyle = () => {
    switch (waterStatus) {
      case 'WASPADA':
        return 'bg-amber-300 text-amber-950';
      case 'BAHAYA':
      case 'SIAGA':
        return 'bg-rose-400 text-rose-950';
      default:
        return 'bg-[#6ee7b7] text-emerald-950';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Above the Fold) */}
      <section className="relative min-h-screen md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white max-w-4xl py-20"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight mb-6">
            Selamat Datang di <br />
            <span className="text-[#93c5fd]">Desa Nogosari Tangguh Bencana</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-normal opacity-95">
            Mewujudkan Desa Nogosari sebagai Desa Konservasi dan Tangguh Bencana melalui Integrasi Program LIMA-SI berbasis IoT dan berkelanjutan
          </p>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">

          {/* 2. Section "Desa Nogosari Tangguh Bencana" Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
              Desa Nogosari Tangguh Bencana
            </h2>
          </motion.div>

          {/* 2A. IoT Status & CTA Action Bar */}
          <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className={`flex-1 rounded-2xl px-6 py-4 flex items-center justify-between shadow-xs gap-4 ${getBannerStyle()}`}
            >
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                KETINGGIAN AIR
              </span>

              <div className="flex items-center gap-2 font-extrabold">
                <Droplet className="h-6 w-6 fill-current shrink-0" />
                <span className="text-xl sm:text-2xl">{waterLevel}</span>
              </div>

              <span className="text-base sm:text-lg font-extrabold tracking-wider">
                {waterStatus}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex shrink-0"
            >
              <Link
                href="/monitoring"
                className="w-full md:w-auto bg-[#1d4ed8] hover:bg-blue-800 text-white font-extrabold text-sm px-6 py-4 rounded-2xl transition-all shadow-xs hover:shadow-md flex items-center justify-center text-center shrink-0"
              >
                Lihat Dashboard Monitoring
              </Link>
            </motion.div>
          </div>

          {/* 2B. Disaster Alert Grid (Grid 2 Kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

            {/* Card 1: Indikator Ambang Batas */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
            >
              <h3 className="font-bold text-gray-900 text-base mb-5">
                Indikator Ambang Batas
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 border-l-4 border-emerald-500">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-gray-800 text-xs sm:text-sm">Normal</span>
                  </div>
                  <span className="font-bold text-gray-700 text-xs sm:text-sm">&lt; 2.0 m</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/60 border-l-4 border-amber-500">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-gray-800 text-xs sm:text-sm">Waspada</span>
                  </div>
                  <span className="font-bold text-gray-700 text-xs sm:text-sm">2.0 - 3.0 m</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-100/70 border-l-4 border-rose-500">
                  <div className="flex items-center gap-2.5">
                    <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                    <span className="font-bold text-rose-900 text-xs sm:text-sm">Bahaya</span>
                  </div>
                  <span className="font-bold text-rose-900 text-xs sm:text-sm">&gt; 4.0 m</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Tindak Evakuasi */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
            >
              <h3 className="font-bold text-gray-900 text-base mb-5">
                Tindak Evakuasi
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50/60 border-l-4 border-emerald-500">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-gray-800 text-xs sm:text-sm">Aman</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50/60 border-l-4 border-amber-500">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-gray-800 text-xs sm:text-sm">Mulai persiapkan diri</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-100/70 border-l-4 border-rose-500">
                  <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                  <span className="font-bold text-rose-900 text-xs sm:text-sm">Segera evakuasi</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* 3. Kontak Darurat Section */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-6"
          >
            <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] mb-8">
              <PhoneCall className="h-7 w-7 text-blue-700 shrink-0" />
              <span>Kontak Darurat</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {emergencyContacts.map((contact, idx) => (
                <motion.a
                  key={contact.name}
                  href={contact.phone}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
                >
                  {contact.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}

