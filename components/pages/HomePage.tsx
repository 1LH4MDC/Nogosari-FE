'use client';

import Link from 'next/link';
import { Droplet, CheckCircle2, AlertTriangle, XCircle, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const emergencyContacts = [
  { name: 'Fiqih - Ketua Destana', phone: '#' },
  { name: 'Hadi - Kasi Pemerintahan', phone: '#' },
  { name: 'Sutrisno - Destana Gumuk Bago', phone: '#' },
  { name: 'Sohib - Destana Krajan', phone: '#' },
  { name: 'Sofyan - Destana Krajan', phone: '#' },
];

export default function HomePage() {
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
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">

          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight">
              Informasi Desa Tangguh Bencana
            </h2>
          </div>

          {/* Status Water Level Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-[#6ee7b7] rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4"
          >
            <span className="text-sm sm:text-base font-bold text-emerald-950 uppercase tracking-widest">
              KETINGGIAN AIR
            </span>

            <div className="flex items-center gap-3 text-emerald-950 font-extrabold">
              <Droplet className="h-7 w-7 fill-current" />
              <span className="text-2xl sm:text-3xl">69 cm</span>
            </div>

            <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 tracking-wider">
              NORMAL
            </span>
          </motion.div>

          {/* 3 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

            {/* Card 1: Indikator Ambang Batas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-gray-900 text-lg mb-6">
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
            </div>

            {/* Card 2: Tindak Evakuasi */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-gray-900 text-lg mb-6">
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
            </div>

            {/* Card 3: Posko Evakuasi */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-gray-900 text-lg mb-6">
                Posko Evakuasi
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center p-3.5 rounded-xl bg-blue-50/60 border-l-4 border-blue-600">
                  <span className="font-bold text-gray-800 text-sm ml-2">Rumah Reza</span>
                </div>

                <div className="flex items-center p-3.5 rounded-xl bg-blue-50/60 border-l-4 border-blue-600">
                  <span className="font-bold text-gray-800 text-sm ml-2">Rumah Ilham</span>
                </div>

                <div className="flex items-center p-3.5 rounded-xl bg-blue-50/60 border-l-4 border-blue-600">
                  <span className="font-bold text-gray-800 text-sm ml-2">Rumah Bagas</span>
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
