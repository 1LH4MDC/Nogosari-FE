'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/common/Logo';
import { Droplet, Clock, Signal, Battery } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showLogoHeader?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showLogoHeader = true,
}: AuthLayoutProps) {
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] flex flex-col justify-center py-10 sm:py-14 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ==================================================== */}
          {/* LEFT COLUMN: FORM SECTION (~40% WIDTH) */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center max-w-md mx-auto w-full lg:max-w-none">
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Logo Header */}
              {showLogoHeader && (
                <div className="flex items-center gap-3 mb-2">
                  <Logo size={44} className="h-11 w-11 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#1e3a8a] leading-tight">
                      Desa Nogosari Tangguh Bencana
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Kabupaten Jember</span>
                  </div>
                </div>
              )}

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1.5 font-medium leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Form Input Slot */}
              <div className="pt-2">{children}</div>
            </motion.div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: VISUAL BANNER (~60% WIDTH) */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative rounded-3xl bg-gradient-to-br from-blue-100 via-blue-50/80 to-white p-8 xl:p-10 border border-blue-100 shadow-sm overflow-hidden min-h-[540px] flex flex-col justify-between"
            >
              {/* Subtle Soft Glow Accent */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

              {/* Header Title inside Banner */}
              <div className="relative z-10 space-y-2 mb-6">
                <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Lihat Kondisi Terkini
                </h2>
                <p className="text-sm xl:text-base text-gray-600 font-medium">
                  Cek ketinggian air sungai secara langsung menggunakan sensor IOT
                </p>
              </div>

              {/* Tilted Floating Mockup Card */}
              <motion.div
                initial={{ rotate: -1, y: 10 }}
                animate={{ rotate: -2, y: [0, -6, 0] }}
                transition={{
                  rotate: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                }}
                className="relative z-10 bg-white rounded-2xl p-6 shadow-xl border border-gray-200/80 -mr-12 -mb-8 transform origin-bottom-right"
              >
                {/* Mockup Top Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-2">
                    <Logo size={28} className="h-7 w-7" iconClassName="h-3.5 w-3.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1e3a8a] leading-none">
                        Desa Nogosari Tangguh Bencana
                      </span>
                      <span className="text-[9px] text-gray-400">Kabupaten Jember</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-500">
                    <span>Home</span>
                    <span>Profil Destana</span>
                    <span>Layanan</span>
                    <span className="text-blue-600 border-b-2 border-blue-600 pb-0.5 font-bold">
                      Monitoring IoT
                    </span>
                    <span>Data</span>
                  </div>
                </div>

                {/* Mockup Dashboard Content Grid */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Main Title & Status Banner */}
                  <div className="col-span-8 space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                        Sistem Monitoring Ketinggian Air Sungai
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        Real-time IoT Sensor Data - Sungai Nogosari
                      </p>
                    </div>

                    <div className="w-full bg-[#6ee7b7] rounded-xl p-3 flex items-center justify-between shadow-xs">
                      <span className="text-[10px] font-extrabold text-emerald-950 uppercase">
                        STATUS SAAT INI
                      </span>
                      <div className="flex items-center gap-1.5 font-extrabold text-emerald-950 text-sm">
                        <Droplet className="h-4 w-4 fill-current" />
                        <span>69 cm</span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-950">NORMAL</span>
                    </div>
                  </div>

                  {/* Status Mini Cards Right */}
                  <div className="col-span-4 space-y-2 text-[10px]">
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-gray-400 block text-[9px]">Update Terakhir</span>
                        <span className="font-bold text-gray-800">Hari ini, 14:30 WIB</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 space-y-1">
                      <span className="text-gray-400 block text-[9px]">Status Sensor</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Online & Aktif
                      </span>
                      <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1 border-t">
                        <span className="flex items-center gap-0.5">
                          <Battery className="h-3 w-3 text-emerald-600" /> 15%
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Signal className="h-3 w-3 text-emerald-600" /> Kuat (-65dBm)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Header Mockup */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-gray-800">
                    Grafik Ketinggian Air (24 Jam Terakhir)
                  </span>
                  <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded text-[9px]">
                    <span className="px-2 py-0.5 bg-white text-blue-700 font-bold rounded shadow-xs">
                      1 Jam
                    </span>
                    <span className="px-2 py-0.5 text-gray-500">1 Hari</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
