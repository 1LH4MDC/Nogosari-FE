'use client';

import { Droplet, Clock, Signal, Battery, MapPin, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', level: 0.2 },
  { time: '03:00', level: 0.3 },
  { time: '06:00', level: 0.5 },
  { time: '09:00', level: 1.1 },
  { time: '12:00', level: 1.3 },
  { time: '15:00', level: 1.4 },
  { time: '18:00', level: 2.1 },
  { time: '21:00', level: 2.5 },
  { time: 'Sekarang', level: 1.2 },
];

export default function MonitoringPage() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-8">

        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Title Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sistem Monitoring Ketinggian Air Sungai
              </h1>
              <p className="text-gray-500">Real-time IoT Sensor Data - Sungai Nogosari</p>
            </div>
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 bg-[#86efac] text-green-900 px-6 py-3 rounded-xl font-bold shadow-sm">
                <Droplet className="h-6 w-6" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase opacity-80">STATUS SAAT INI</span>
                  <span className="text-xl">NORMAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Update Terakhir</p>
                <p className="font-bold text-gray-900">Hari ini, 14:30 WIB</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Signal className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status Sensor</p>
                  <p className="font-bold text-green-600">Online & Aktif</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500">Baterai</span>
                    <span className="text-sm font-semibold">95%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4 text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500">Sinyal</span>
                    <span className="text-sm font-semibold">Kuat (-85dBm)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Grafik Ketinggian Air (24 Jam Terakhir)</h2>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-md">1 Hari</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md">7 Hari</button>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `${value.toFixed(1)}m`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`${value} Meter`, 'Ketinggian Air']}
                  />
                  <Area
                    type="monotone"
                    dataKey="level"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorLevel)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Log Aktivitas Terakhir</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <time className="text-xs font-medium text-gray-500">Hari ini, 14:45 WIB</time>
                  </div>
                  <div className="text-sm text-gray-700">Kalibrasi sensor pH dan suhu air berhasil diselesaikan.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <time className="text-xs font-medium text-gray-500">Hari ini, 14:30 WIB</time>
                  </div>
                  <div className="text-sm text-gray-700">Pembaruan data berhasil: <span className="text-green-600 font-medium">1.2m (Normal)</span></div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <time className="text-xs font-medium text-gray-500">Hari ini, 13:00 WIB</time>
                  </div>
                  <div className="text-sm text-gray-700">Kalibrasi sensor otomatis selesai.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white bg-yellow-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-4 rounded-xl border border-gray-100 bg-yellow-50 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <time className="text-xs font-medium text-gray-500">Hari ini, 10:15 WIB</time>
                  </div>
                  <div className="text-sm text-gray-700">Peringatan sistem: intensitas hujan meningkat di area hulu.</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ambang Batas */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Indikator Ambang Batas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-gray-900">Normal</span>
                </div>
                <span className="font-medium text-gray-700">&lt; 2.0 m</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-yellow-100 bg-yellow-50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-gray-900">Waspada</span>
                </div>
                <span className="font-medium text-gray-700">2.0 - 3.0 m</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-gray-900">Bahaya</span>
                </div>
                <span className="font-medium text-red-600 font-bold">&gt; 4.0 m</span>
              </div>
            </div>
          </div>

          {/* Lokasi Sensor */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Lokasi Sensor</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">ID: SENS_001</span>
            </div>
            <div className="relative flex-1 rounded-xl overflow-hidden bg-gray-100 min-h-[220px]">
              <iframe
                title="Google Maps Lokasi Sensor"
                src="https://maps.google.com/maps?q=-8.2435,113.6268&t=m&z=15&ie=UTF8&iwloc=near&output=embed"
                className="absolute -top-12 -left-2 w-[110%] h-[130%] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur p-3 rounded-lg shadow-md flex items-start gap-3 pointer-events-none">
                <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Titik Pantau Sungai Utama</h3>
                  <p className="text-xs text-gray-500">Koordinat: -8.2435, 113.6268</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
