'use client';

import { useState, useEffect } from 'react';
import {
  Droplet, Clock, Signal, Battery, CheckCircle2, AlertTriangle, XCircle, RefreshCw
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Initial dataset for 24-hour river water monitoring
const chartData24h = [
  { time: '00:00', level: 0.5 },
  { time: '06:00', level: 1.2 },
  { time: '12:00', level: 1.3 },
  { time: '18:00', level: 2.1 },
  { time: 'Sekarang', level: 0.69 },
];

const chartData1h = [
  { time: '14:00', level: 0.68 },
  { time: '14:10', level: 0.68 },
  { time: '14:20', level: 0.69 },
  { time: '14:30', level: 0.69 },
  { time: 'Sekarang', level: 0.69 },
];

const chartData7d = [
  { time: 'Sen', level: 0.8 },
  { time: 'Sel', level: 1.1 },
  { time: 'Rab', level: 1.4 },
  { time: 'Kam', level: 2.2 },
  { time: 'Jum', level: 1.0 },
  { time: 'Sab', level: 0.7 },
  { time: 'Ming', level: 0.69 },
];

interface LogItem {
  id: string;
  time: string;
  level: string;
  status: 'Normal' | 'Waspada' | 'Bahaya';
}

const initialLogs: LogItem[] = [
  { id: '1', time: 'Hari Ini, 14:45 WIB', level: '1.2m', status: 'Normal' },
  { id: '2', time: 'Hari Ini, 14:30 WIB', level: '1.2m', status: 'Normal' },
  { id: '3', time: 'Hari Ini, 13:00 WIB', level: '1.2m', status: 'Normal' },
  { id: '4', time: 'Hari Ini, 10:15 WIB', level: '2.6m', status: 'Waspada' },
  { id: '5', time: 'Kemarin, 23:50 WIB', level: '4.2m', status: 'Bahaya' },
];

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState<'1Jam' | '1Hari' | '7Hari'>('1Hari');
  const [waterLevelCm, setWaterLevelCm] = useState(69);
  const [batteryLevel, setBatteryLevel] = useState(15);
  const [isLiveConnected, setIsLiveConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('Hari ini, 14:30 WIB');

  // Simulated WebSocket / Polling stream setup
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor fluctuation in real-time sensor polling
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      setWaterLevelCm((prev) => Math.max(50, Math.min(180, prev + delta)));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    if (activeTab === '1Jam') return chartData1h;
    if (activeTab === '7Hari') return chartData7d;
    return chartData24h;
  };

  const getStatusConfig = (cm: number) => {
    const meters = cm / 100;
    if (meters < 2.0) {
      return {
        label: 'NORMAL',
        bgColor: 'bg-[#6ee7b7]',
        textColor: 'text-emerald-950',
      };
    } else if (meters <= 3.0) {
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

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Main Title & Live Banner Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/70 shadow-sm flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                Sistem Monitoring Ketinggian Air Sungai
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Real-time IoT Sensor Data - Sungai Nogosari
              </p>
            </div>

            <div className="mt-8">
              <div className={`w-full rounded-2xl ${currentStatus.bgColor} px-6 py-4 flex items-center justify-between shadow-sm transition-all duration-300`}>
                <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${currentStatus.textColor}`}>
                  STATUS SAAT INI
                </span>
                
                <div className={`flex items-center gap-3 font-extrabold ${currentStatus.textColor}`}>
                  <Droplet className="h-6 w-6 fill-current" />
                  <span className="text-2xl sm:text-3xl">{waterLevelCm} cm</span>
                  <span className="text-xl sm:text-2xl tracking-wide ml-2">{currentStatus.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Status Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            
            {/* Update Terakhir Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-0.5">Update Terakhir</p>
                <p className="font-bold text-gray-900 text-sm">{lastUpdated}</p>
              </div>
            </div>

            {/* Status Sensor Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/70 shadow-sm flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Signal className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-0.5">Status Sensor</p>
                  <p className="font-bold text-emerald-600 text-sm flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Aktif
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Baterai</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <Battery className="h-4 w-4 text-emerald-600" />
                    {batteryLevel}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Sinyal</span>
                  <span className="font-bold text-gray-800">Kuat (-65dBm)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Grafik Ketinggian Air (24 Jam Terakhir)
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('1Jam')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  activeTab === '1Jam' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1 Jam
              </button>
              <button
                onClick={() => setActiveTab('1Hari')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  activeTab === '1Hari' ? 'bg-blue-100 text-blue-800 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1 Hari
              </button>
              <button
                onClick={() => setActiveTab('7Hari')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  activeTab === '7Hari' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                7 Hari
              </button>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-[280px] sm:h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData()} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 5]}
                  ticks={[0, 1.0, 2.0, 3.0, 4.0, 5.0]}
                  tickFormatter={(val) => `${val.toFixed(1)}m`}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(val: any) => [`${val} Meter`, 'Ketinggian Air']}
                />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#waterGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Card: Indikator Ambang Batas */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm flex flex-col justify-between">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Indikator Ambang Batas
            </h2>

            <div className="space-y-4">
              {/* Normal */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Normal</span>
                </div>
                <span className="font-bold text-gray-700 text-sm">&lt; 2.0 m</span>
              </div>

              {/* Waspada */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50/60 border border-amber-100/80">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Waspada</span>
                </div>
                <span className="font-bold text-gray-700 text-sm">2.0 - 3.0 m</span>
              </div>

              {/* Bahaya */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-rose-100/70 border border-rose-200/60">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center">
                    <XCircle className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-rose-900 text-sm">Bahaya</span>
                </div>
                <span className="font-bold text-rose-900 text-sm">&gt; 4.0 m</span>
              </div>
            </div>
          </div>

          {/* Right Card: Log Aktivitas Terakhir */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Log Aktivitas Terakhir
            </h2>

            <div className="space-y-4">
              {initialLogs.map((log) => {
                const getDotColor = (s: string) => {
                  if (s === 'Normal') return 'bg-emerald-500';
                  if (s === 'Waspada') return 'bg-amber-500';
                  return 'bg-rose-500';
                };

                return (
                  <div key={log.id} className="flex items-start gap-3.5 text-xs sm:text-sm">
                    <span className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${getDotColor(log.status)}`} />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs font-medium">{log.time}</span>
                      <span className="font-bold text-gray-800">
                        Ketinggian Air : {log.level} ({log.status})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
