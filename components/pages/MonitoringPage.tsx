'use client';

import { useState, useEffect } from 'react';
import {
  Droplet, Clock, Signal, Battery, CheckCircle2, AlertTriangle, XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea
} from 'recharts';
import { getLatestSensorReading, getSensorHistory } from '@/lib/api';

const chartData24h = [
  { time: '00:00', level: 3.6 },
  { time: '06:00', level: 3.4 },
  { time: '12:00', level: 3.5 },
  { time: '18:00', level: 2.8 },
  { time: 'Sekarang', level: 3.45 },
];

const chartData1h = [
  { time: '14:00', level: 3.45 },
  { time: '14:10', level: 3.48 },
  { time: '14:20', level: 3.46 },
  { time: '14:30', level: 3.44 },
  { time: 'Sekarang', level: 3.45 },
];

const chartData7d = [
  { time: 'Sen', level: 3.6 },
  { time: 'Sel', level: 3.4 },
  { time: 'Rab', level: 3.2 },
  { time: 'Kam', level: 2.6 },
  { time: 'Jum', level: 3.1 },
  { time: 'Sab', level: 3.5 },
  { time: 'Ming', level: 3.45 },
];

interface LogItem {
  id: string;
  time: string;
  level: string;
  status: 'Normal' | 'Waspada' | 'Bahaya';
}

const initialLogs: LogItem[] = [
  { id: '1', time: 'Hari Ini, 14:45 WIB', level: '3.45m', status: 'Normal' },
  { id: '2', time: 'Hari Ini, 14:30 WIB', level: '3.44m', status: 'Normal' },
  { id: '3', time: 'Hari Ini, 14:00 WIB', level: '3.45m', status: 'Normal' },
  { id: '4', time: 'Hari Ini, 10:15 WIB', level: '2.40m', status: 'Waspada' },
  { id: '5', time: 'Kemarin, 23:50 WIB', level: '1.50m', status: 'Bahaya' },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState<'1Jam' | '1Hari' | '7Hari'>('1Hari');
  const [waterLevelCm, setWaterLevelCm] = useState(345);
  const [batteryLevel, setBatteryLevel] = useState(95);
  const [signalQuality, setSignalQuality] = useState('Kuat (-65dBm)');
  const [lastUpdated, setLastUpdated] = useState('Hari ini, 14:30 WIB');
  const [historyData, setHistoryData] = useState<{ time: string; level: number }[]>([]);
  const [logs, setLogs] = useState<LogItem[]>(initialLogs);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    async function fetchData() {
      try {
        const latest = await getLatestSensorReading();
        if (latest) {
          if (latest.reading !== undefined) setWaterLevelCm(latest.reading);
          if (latest.battery !== undefined) setBatteryLevel(latest.battery);
          if (latest.signal) setSignalQuality(latest.signal);
          if (latest.timestamp) {
            const timeStr = new Date(latest.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            setLastUpdated(`Hari ini, ${timeStr} WIB`);
          }
        }

        const history = await getSensorHistory(20);
        if (Array.isArray(history) && history.length > 0) {
          const formatted = history.map((item: any) => ({
            time: item.created_at ? new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : (item.time || '00:00'),
            level: (item.water_level || item.reading || 0) / 100,
          })).reverse();
          setHistoryData(formatted);

          // Synchronize recent logs with real readings from sensor history
          const mappedLogs: LogItem[] = history.slice(0, 5).map((item: any, idx: number) => {
            const meters = (item.water_level || item.reading || 0) / 100;
            let status: 'Normal' | 'Waspada' | 'Bahaya' = 'Normal';
            if (meters < 2.0) status = 'Bahaya';
            else if (meters <= 3.0) status = 'Waspada';
            else status = 'Normal';

            const timeStr = item.created_at
              ? new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
              : `Bacaan #${idx + 1}`;

            return {
              id: item.id ? String(item.id) : String(idx),
              time: `Hari Ini, ${timeStr}`,
              level: `${meters.toFixed(2)}m`,
              status,
            };
          });

          if (mappedLogs.length > 0) {
            setLogs(mappedLogs);
          }
        }
      } catch (err) {
        console.error('Error fetching live monitoring data:', err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000); // 10s polling
    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    if (historyData.length > 0 && activeTab === '1Hari') return historyData;
    if (activeTab === '1Jam') return chartData1h;
    if (activeTab === '7Hari') return chartData7d;
    return chartData24h;
  };

  const getStatusConfig = (cm: number) => {
    const meters = cm / 100;
    // Semakin kecil jarak ke sensor (semakin dekat) = semakin tinggi air = semakin bahaya
    if (meters > 3.0) {
      return {
        label: 'NORMAL (Aman)',
        bgColor: 'bg-[#6ee7b7]',
        textColor: 'text-emerald-950',
      };
    } else if (meters >= 2.0) {
      return {
        label: 'WASPADA',
        bgColor: 'bg-amber-300',
        textColor: 'text-amber-950',
      };
    } else {
      return {
        label: 'BAHAYA',
        bgColor: 'bg-rose-400',
        textColor: 'text-rose-950',
      };
    }
  };

  const currentStatus = getStatusConfig(waterLevelCm);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* 1. Top Section (Real-Time Sensor & Device Status Grid 2 Kolom) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6"
        >
          {/* Column Kiri (~65% / 8 cols): Main Status Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                Monitoring Jarak Permukaan Air Sungai
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Sensor IoT Ultrasonik Jarak Bebas (Freeboard) — Sungai Nogosari
              </p>
            </div>

            <div className="mt-8 space-y-2">
              <div className={`w-full rounded-2xl ${currentStatus.bgColor} px-6 py-4 flex items-center justify-between shadow-xs transition-all duration-300`}>
                <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider ${currentStatus.textColor}`}>
                  JARAK KE SENSOR
                </span>

                <div className={`flex items-center gap-3 font-extrabold ${currentStatus.textColor}`}>
                  <Droplet className="h-6 w-6 fill-current shrink-0" />
                  <span className="text-2xl sm:text-3xl">{(waterLevelCm / 100).toFixed(2)} m</span>
                  <span className="text-lg sm:text-2xl tracking-wide ml-2">{currentStatus.label}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 font-semibold text-right">
                *Diukur dari sensor di atas jembatan/tiang ke permukaan air sungai (semakin dekat = air naik).
              </p>
            </div>
          </div>

          {/* Column Kanan (~35% / 4 cols): Device & Update Metrics Card */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">

            {/* Top Card: Update Terakhir */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-xs flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-0.5">Update Terakhir</p>
                <p className="font-bold text-gray-900 text-sm">{lastUpdated}</p>
              </div>
            </div>

            {/* Bottom Card: Status Sensor */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-xs flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Signal className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-0.5">Status Sensor</p>
                  <p className="font-bold text-emerald-600 text-sm flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    Online & Aktif
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Baterai</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <Battery className="h-4 w-4 text-emerald-600 shrink-0" />
                    {batteryLevel}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Sinyal</span>
                  <span className="font-bold text-gray-800">{signalQuality}</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. Main Chart Section (Grafik Ketinggian Air) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">
                Grafik Tren Jarak Bebas Permukaan Air ({activeTab === '1Jam' ? '1 Jam Terakhir' : activeTab === '7Hari' ? '7 Hari Terakhir' : '24 Jam Terakhir'})
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-bold text-gray-600">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200"><span className="h-2 w-2 rounded-full bg-rose-500" /> Bahaya (&lt;2.0m)</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200"><span className="h-2 w-2 rounded-full bg-amber-500" /> Waspada (2.0-3.0m)</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Normal (&gt;3.0m)</span>
              </div>
            </div>

            {/* Time Filter Toggle */}
            <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('1Jam')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === '1Jam' ? 'bg-white text-[#1d4ed8] shadow-2xs font-extrabold' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                1 Jam
              </button>
              <button
                onClick={() => setActiveTab('1Hari')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === '1Hari' ? 'bg-[#1d4ed8] text-white shadow-2xs font-extrabold' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                1 Hari
              </button>
              <button
                onClick={() => setActiveTab('7Hari')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === '7Hari' ? 'bg-white text-[#1d4ed8] shadow-2xs font-extrabold' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                7 Hari
              </button>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-[280px] sm:h-[340px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  
                  {/* Colored Zone Background Bands */}
                  <ReferenceArea y1={0.5} y2={2.0} fill="#fecdd3" fillOpacity={0.25} />
                  <ReferenceArea y1={2.0} y2={3.0} fill="#fef3c7" fillOpacity={0.25} />
                  <ReferenceArea y1={3.0} y2={5.0} fill="#d1fae5" fillOpacity={0.25} />

                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    reversed
                    axisLine={false}
                    tickLine={false}
                    domain={[0.5, 5.0]}
                    ticks={[1.0, 2.0, 3.0, 4.0, 5.0]}
                    tickFormatter={(val) => `${val.toFixed(1)}m`}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                    formatter={(val: any) => [`${val} Meter`, 'Jarak Permukaan ke Sensor']}
                  />
                  <ReferenceLine y={2.0} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1.5} />
                  <ReferenceLine y={3.0} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Area
                    type="monotone"
                    dataKey="level"
                    stroke="#1d4ed8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#waterGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* 3. Bottom Section (Information & Logs Grid 2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Column Kiri: Indikator Ambang Batas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-1">
                Indikator Ambang Batas (Jarak Bebas Sensor)
              </h2>
              <p className="text-xs text-gray-400 font-medium mb-5">
                Jarak pantulan gelombang ultrasonik dari sensor atas ke permukaan air.
              </p>
            </div>

            <div className="space-y-3">
              {/* Bahaya */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50/70 border-l-4 border-rose-500">
                <div className="flex items-center gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                  <div>
                    <span className="font-extrabold text-rose-900 text-xs sm:text-sm block">Bahaya</span>
                    <span className="text-[11px] text-rose-600 font-medium">Air sangat dekat dengan sensor (siaga meluap)</span>
                  </div>
                </div>
                <span className="font-black text-rose-900 text-xs sm:text-sm">&lt; 2.0 m</span>
              </div>

              {/* Waspada */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border-l-4 border-amber-500">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-amber-900 text-xs sm:text-sm block">Waspada</span>
                    <span className="text-[11px] text-amber-700 font-medium">Permukaan air mulai naik mendekati batas</span>
                  </div>
                </div>
                <span className="font-black text-amber-900 text-xs sm:text-sm">2.0 - 3.0 m</span>
              </div>

              {/* Normal */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/70 border-l-4 border-emerald-500">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-emerald-900 text-xs sm:text-sm block">Normal / Aman</span>
                    <span className="text-[11px] text-emerald-700 font-medium">Permukaan air stabil jauh di bawah sensor</span>
                  </div>
                </div>
                <span className="font-black text-emerald-900 text-xs sm:text-sm">&gt; 3.0 m</span>
              </div>
            </div>
          </motion.div>

          {/* Column Kanan: Log Aktivitas Terakhir */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-xs flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-1">
                Log Pembacaan Terakhir Sensor
              </h2>
              <p className="text-xs text-gray-400 font-medium mb-5">
                Riwayat catatan jarak permukaan air ke alat ultrasonik.
              </p>
            </div>

            <div className="space-y-3">
              {logs.map((log) => {
                const getStatusBadge = (s: string) => {
                  if (s === 'Normal') return { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
                  if (s === 'Waspada') return { dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-800 border-amber-200' };
                  return { dot: 'bg-rose-500', badge: 'bg-rose-800 text-rose-800 border-rose-200' };
                };
                const badgeStyle = getStatusBadge(log.status);

                return (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${badgeStyle.dot}`} />
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[11px] font-semibold">{log.time}</span>
                        <span className="font-bold text-gray-800 text-xs sm:text-sm">
                          Jarak ke Sensor: {log.level}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeStyle.badge}`}>
                      {log.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}

