'use client';

import React from 'react';
import { History, Target, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// ==========================================
// FRAMER MOTION VARIANTS
// ==========================================
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
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

export default function ProfilPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      {/* ==================================================== */}
      {/* SECTION 1: INITIAL VIEW / HERO SECTION (ABOVE THE FOLD) */}
      {/* ==================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 md:px-8 text-center max-w-4xl mx-auto py-16">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-6"
        >
          {/* Main Title */}
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-[#1d4ed8]"
          >
            Mengenal Lebih Dekat <br />
            <span>Desa Nogosari Tangguh Bencana</span>
          </motion.h1>

          {/* Subtitle Quote */}
          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl font-normal opacity-90"
          >
            Desa Nogosari Tangguh Bencana lahir berdasarkan kode dari suara alam yang tidak bisa terprediksi oleh indra alami yang dimiliki oleh manusia
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
          <span>Gulir untuk Baca Selengkapnya</span>
          <ChevronDown className="h-5 w-5 text-blue-600" />
        </motion.div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 2: CONTENT SECTION (SCROLL REVEAL) */}
      {/* ==================================================== */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-gray-200/60">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-20 sm:space-y-28">

          {/* Sejarah, Visi & Misi Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sejarah (Left Column) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 rounded-2xl bg-white border border-gray-200/70 p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <History className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#1e3a8a]">
                    Sejarah Desa Tangguh Bencana
                  </h2>
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base font-normal">
                  <p>
                    Desa Nogosari memiliki rekam jejak panjang sebagai komunitas agraris yang sangat bergantung pada kelestarian tata air. Sejak puluhan tahun lalu, leluhur desa ini telah membangun sistem irigasi komunal yang mengairi sawah-sawah terasering.
                  </p>
                  <p>
                    Kini, sejalan dengan perkembangan zaman, tradisi gotong royong tersebut kami padukan dengan teknologi pemantauan IoT (Internet of Things) untuk memastikan kualitas dan kuantitas air tetap terjaga demi kesejahteraan seluruh warga.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Visi & Misi (Right Column) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Visi Card */}
              <div className="rounded-2xl bg-[#1d4ed8] p-7 text-white shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-blue-200" />
                  <h2 className="text-lg font-extrabold">Visi Destana</h2>
                </div>
                <p className="text-blue-50 text-sm sm:text-base leading-relaxed italic font-normal">
                  &ldquo;Terwujudnya Desa Nogosari yang Mandiri, Sejahtera, dan Berkelanjutan melalui Harmoni Alam dan Teknologi.&rdquo;
                </p>
              </div>

              {/* Misi Card */}
              <div className="rounded-2xl bg-blue-50/80 border border-blue-100/80 p-7 text-blue-950 shadow-xs flex-1">
                <h2 className="text-lg font-extrabold mb-4 text-[#1e3a8a]">
                  Misi Destana
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-blue-950/90 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Meningkatkan kualitas tata kelola air desa.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Mendorong adopsi teknologi tepat guna.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Memberdayakan ekonomi masyarakat lokal.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>

          {/* Tupoksi Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Tugas Pokok dan Fungsi <br /> Desa Tangguh Bencana
            </h2>
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-700 bg-blue-100/80 px-4 py-1.5 rounded-full inline-block">
              TUPOKSI DESTANA
            </span>
          </motion.div>

          {/* Peta Desa Tangguh Bencana */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                Peta Desa Tangguh Bencana
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Potret wilayah geografis dan lokasi batas Desa Nogosari, Kecamatan Rambipuji, Jember.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xs border border-gray-200/80">
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Info Panel Left */}
                <div className="md:col-span-6 p-6 sm:p-8 bg-white z-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-extrabold text-gray-900 mb-3 text-sm">
                        Batas Desa:
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm">
                        <div>
                          <span className="block text-gray-400 font-semibold mb-0.5">Utara</span>
                          <span className="text-[#1e3a8a] font-bold">DESA KALIWINING</span>
                        </div>
                        <div>
                          <span className="block text-gray-400 font-semibold mb-0.5">Timur</span>
                          <span className="text-[#1e3a8a] font-bold">DESA MANGARAN</span>
                        </div>
                        <div>
                          <span className="block text-gray-400 font-semibold mb-0.5">Selatan</span>
                          <span className="text-[#1e3a8a] font-bold">DESA GLUNDENGAN</span>
                        </div>
                        <div>
                          <span className="block text-gray-400 font-semibold mb-0.5">Barat</span>
                          <span className="text-[#1e3a8a] font-bold">DESA GUMELAR</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-sm">
                      <span className="font-bold text-gray-900">Luas Wilayah:</span>
                      <span className="text-[#1d4ed8] font-extrabold">1.989,49 Ha</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-sm">
                      <span className="font-bold text-gray-900">Jumlah Penduduk:</span>
                      <span className="text-[#1d4ed8] font-extrabold">22.000 Jiwa</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed Right */}
                <div className="md:col-span-6 relative min-h-[320px] md:min-h-[400px] bg-gray-100 overflow-hidden">
                  <iframe
                    title="Google Maps Batas Wilayah Desa Nogosari"
                    src="https://maps.google.com/maps?q=Desa+Nogosari,+Rambipuji,+Jember&t=m&z=13&ie=UTF8&iwloc=none&output=embed"
                    className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
