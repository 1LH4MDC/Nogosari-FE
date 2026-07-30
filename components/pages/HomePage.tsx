'use client';

import Link from 'next/link';
import { Droplet, CheckCircle2, AlertTriangle, XCircle, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { getLatestSensorReading } from '@/lib/api';

const emergencyContacts = [
  { name: 'Fiqih - Ketua Destana', phone: '#' },
  { name: 'Hadi - Kasi Pemerintahan', phone: '#' },
  { name: 'Sutrisno - Destana Gumuk Bago', phone: '#' },
  { name: 'Sohib - Destana Krajan', phone: '#' },
  { name: 'Sofyan - Destana Krajan', phone: '#' },
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

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="relative min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white max-w-4xl py-20"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md leading-tight mb-6">
            Selamat Datang di <br />
            <span className="text-blue-200">Desa Nogosari Tangguh Bencana</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-normal opacity-95">
            Mewujudkan Desa Nogosari sebagai Desa Konservasi dan Tangguh Bencana melalui Integrasi Program LIMA-SI berbasis IoT dan berkelanjutan
          </p>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">

          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
              Desa Nogosari Tangguh Bencana
            </h2>
          </div>

          {/* Status Water Level Banner + Button Row */}
          <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 bg-[#6ee7b7] rounded-2xl px-6 py-4 flex items-center justify-between shadow-xs gap-4"
            >
              <span className="text-xs sm:text-sm font-extrabold text-emerald-950 uppercase tracking-wider">
                KETINGGIAN AIR
              </span>

              <div className="flex items-center gap-2 text-emerald-950 font-extrabold">
                <Droplet className="h-6 w-6 fill-current" />
                <span className="text-xl sm:text-2xl">{waterLevel}</span>
              </div>

              <span className="text-base sm:text-lg font-extrabold text-emerald-950 tracking-wider">
                {waterStatus}
              </span>
            </motion.div>

            <Link
              href="/monitoring"
              className="bg-[#1d4ed8] hover:bg-blue-800 text-white font-extrabold text-sm px-6 py-4 rounded-2xl transition-all shadow-xs hover:shadow-md flex items-center justify-center text-center shrink-0"
            >
              Lihat Dashboard Monitoring
            </Link>
          </div>

          {/* 2 Grid Cards Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

            {/* Card 1: Indikator Ambang Batas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between">
              <h3 className="font-bold text-gray-900 text-base mb-5">
                Indikator Ambang Batas
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/50 border-l-4 border-emerald-600">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-gray-800 text-xs sm:text-sm">Normal</span>
                  </div>
                  <span className="font-bold text-gray-700 text-xs sm:text-sm">&lt; 2.0 m</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/50 border-l-4 border-amber-500">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-gray-800 text-xs sm:text-sm">Waspada</span>
                  </div>
                  <span className="font-bold text-gray-700 text-xs sm:text-sm">2.0 - 3.0 m</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-100/70 border-l-4 border-rose-600">
                  <div className="flex items-center gap-2.5">
                    <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                    <span className="font-bold text-rose-900 text-xs sm:text-sm">Bahaya</span>
                  </div>
                  <span className="font-bold text-rose-900 text-xs sm:text-sm">&gt; 4.0 m</span>
                </div>
              </div>
            </div>

            {/* Card 2: Tindak Evakuasi */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between">
              <h3 className="font-bold text-gray-900 text-base mb-5">
                Tindak Evakuasi
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50/50 border-l-4 border-emerald-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-gray-800 text-xs sm:text-sm">Aman</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50/50 border-l-4 border-amber-500">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-gray-800 text-xs sm:text-sm">Mulai persiapkan diri</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-100/70 border-l-4 border-rose-600">
                  <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                  <span className="font-bold text-rose-900 text-xs sm:text-sm">Segera evakuasi</span>
                </div>
              </div>
            </div>

          </div>

          {/* Emergency Contacts Section */}
          <div className="text-center pt-6">
            <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] mb-8">
              <PhoneCall className="h-7 w-7 text-blue-700" />
              <span>Kontak Darurat</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {emergencyContacts.map((contact) => (
                <Link
                  key={contact.name}
                  href={contact.phone}
                  className="rounded-xl bg-[#1d4ed8] hover:bg-blue-800 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {contact.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
