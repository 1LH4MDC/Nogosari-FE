'use client';

import { History, Target, ShieldCheck, MapPin, Compass, Users, Layers, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* 1. Hero Section (Above the Fold) */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1d4ed8] leading-tight sm:leading-tight mb-6">
              Mengenal Lebih Dekat <br />
              Desa Nogosari Tangguh Bencana
            </h1>
            <p className="text-base sm:text-xl text-gray-600 font-normal leading-relaxed max-w-3xl mx-auto">
              Desa Nogosari Tangguh Bencana lahir berdasarkan kode dari suara alam yang tidak bisa terprediksi oleh indra alami yang dimiliki oleh manusia
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Sejarah, Visi & Misi Section */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

            {/* Sejarah (Left Column - 7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 rounded-2xl bg-white border border-gray-200/70 p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-blue-50 text-[#1d4ed8]">
                    <History className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Sejarah Desa Tangguh Bencana</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>
                    Desa Nogosari memiliki rekam jejak panjang sebagai komunitas agraris yang sangat bergantung pada kelestarian tata air dan keseimbangan lingkungan. Sejak puluhan tahun lalu, masyarakat dan leluhur desa telah menjalin keharmonisan dengan alam sekitar.
                  </p>
                  <p>
                    Seiring meningkatnya potensi risiko bencana dan dinamika iklim global, program Desa Tangguh Bencana (Destana) Nogosari dibentuk. Melalui integrasi Program LIMA-SI berbasis IoT (Internet of Things) dan pemberdayaan berbasis komunitas, Destana Nogosari hadir untuk mentransformasikan kewaspadaan tradisional menjadi kesiapsiagaan bencana yang modern, responsif, dan berkelanjutan.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Visi & Misi (Right Column - 5 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Visi */}
              <div className="rounded-2xl bg-[#1d4ed8] p-8 text-white shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <Target className="h-5 w-5 text-blue-200" />
                  <h2 className="text-xl font-bold">Visi Destana</h2>
                </div>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed italic">
                  &quot;Terwujudnya Desa Nogosari yang Mandiri, Tangguh, dan Berkelanjutan melalui Harmoni Konservasi Alam, Teknologi IoT, dan Pemberdayaan Komunitas.&quot;
                </p>
              </div>

              {/* Misi */}
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-8 text-blue-950 shadow-xs flex-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <ShieldCheck className="h-5 w-5 text-[#1d4ed8]" />
                  <h2 className="text-xl font-bold text-blue-900">Misi Destana</h2>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-blue-900/90">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1d4ed8] font-bold select-none">•</span>
                    <span>Meningkatkan kualitas tata kelola mitigasi bencana dan pemantauan tata air desa secara terpadu.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1d4ed8] font-bold select-none">•</span>
                    <span>Mendorong adopsi teknologi tepat guna berbasis sistem peringatan dini IoT.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1d4ed8] font-bold select-none">•</span>
                    <span>Memberdayakan kapasitas masyarakat lokal dan kelompok rentan dalam kesiapsiagaan bencana.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>

          {/* 3. Tugas Pokok dan Fungsi (TUPOKSI) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a8a] tracking-tight mb-3">
                Tugas Pokok dan Fungsi
              </h2>
              <p className="text-xs uppercase font-extrabold tracking-widest text-blue-600">
                TUPOKSI DESTANA NOGOSARI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: AlertCircle,
                  title: 'Peringatan Dini IoT',
                  desc: 'Memantau indikator ketinggian air secara real-time untuk menyebarkan sinyal peringatan dini.',
                },
                {
                  icon: Users,
                  title: 'Edukasi & Mitigasi',
                  desc: 'Menyelenggarakan pelatihan dan simulasi evakuasi berkala bagi seluruh warga desa.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Respon Cepat Evakuasi',
                  desc: 'Mengoordinasikan alur evakuasi mandiri dan bantuan logistik darurat bencana.',
                },
                {
                  icon: Layers,
                  title: 'Konservasi Lingkungan',
                  desc: 'Menjaga ekosistem perairan dan penghijauan desa demi keberlanjutan masa depan.',
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 rounded-xl bg-blue-50 text-[#1d4ed8] w-fit mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 4. Peta Lokasi Desa */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-[#1e3a8a] tracking-tight mb-2">Peta Desa Tangguh Bencana</h2>
              <p className="text-gray-600 text-sm sm:text-base">Potret geografis dan lokasi integrasi program LIMA-SI di Desa Nogosari.</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xs border border-gray-200/70">
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Info Panel (Left) */}
                <div className="md:col-span-6 p-8 lg:p-10 bg-white flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-[#1d4ed8]" />
                      <h3 className="text-2xl font-extrabold text-gray-900">Batas Wilayah Desa</h3>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                        <Compass className="h-4 w-4 text-blue-600" /> Batas Desa:
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <span className="block text-gray-500 font-medium mb-0.5 text-xs">Utara</span>
                          <span className="text-gray-900 font-bold">DESA KALIWINING</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <span className="block text-gray-500 font-medium mb-0.5 text-xs">Timur</span>
                          <span className="text-gray-900 font-bold">DESA MANGARAN</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <span className="block text-gray-500 font-medium mb-0.5 text-xs">Selatan</span>
                          <span className="text-gray-900 font-bold">DESA GLUNDENGAN</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <span className="block text-gray-500 font-medium mb-0.5 text-xs">Barat</span>
                          <span className="text-gray-900 font-bold">DESA GUMELAR</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-sm">
                      <span className="font-bold text-gray-900">Luas Desa:</span>
                      <span className="text-[#1d4ed8] font-extrabold">1.989,49 Ha</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-sm">
                      <span className="font-bold text-gray-900">Jumlah Penduduk:</span>
                      <span className="text-[#1d4ed8] font-extrabold">22.000 Jiwa</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed (Right) */}
                <div className="md:col-span-6 relative min-h-[350px] md:min-h-[420px] bg-gray-100 overflow-hidden">
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

