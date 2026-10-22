import {
  AuthResponse,
  SensorReading,
  SensorDevice,
  ThresholdUpdatePayload,
  RentanBanjirData,
  RentanBanjirPayload,
  PosyanduOption,
  DusunOption,
  KategoriOption,
  RentanBanjirSummary,
  PengaduanData,
  PengaduanPayload,
} from '@/types';

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
export const SWAGGER_DOCS_URL = `${API_BASE_URL}/api-docs`;

// --- Simple in-memory cache (TTL: 2 minutes) for rarely-changing data ---
const _cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = _cache.get(key);
  if (cached && now - cached.ts < CACHE_TTL_MS) return cached.data as T;
  const data = await fetcher();
  _cache.set(key, { data, ts: now });
  return data;
}

export function invalidateCache(key?: string) {
  if (key) _cache.delete(key);
  else _cache.clear();
}

function createDemoSensorHistory(limit = 100): SensorReading[] {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  const sevenDays = 7 * 24 * oneHour;

  return Array.from({ length: limit }, (_, index) => {
    const age = index < 6
      ? index * 10 * 60 * 1000
      : oneHour + (index - 5) * ((sevenDays - oneHour) / Math.max(1, limit - 6));
    const reading = 330 + 24 * Math.sin(index * 0.42) + 9 * Math.cos(index * 0.19);

    return {
      id: -(index + 1),
      id_sensor: 'SN-001',
      nilai_ketinggian: Number(reading.toFixed(1)),
      satuan: 'cm',
      status_siaga: 'Aman',
      timestamp: new Date(now - age).toISOString(),
      nama_lokasi: 'Sungai Nogosari Utama',
      is_demo: true,
    };
  });
}

function createDemoLatestReading(): SensorReading {
  return createDemoSensorHistory(1)[0];
}

// Helper to get auth header from localStorage
function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// 1. Auth API
export async function loginAdmin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data: AuthResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || 'Login gagal. Periksa kembali email dan password Anda.');
  }
  if (data.token && typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
    if (data.admin || data.user) {
      localStorage.setItem('user', JSON.stringify(data.admin || data.user));
    }
  }
  return data;
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

// 2. Sensor IoT API
export async function getLatestSensorReading(): Promise<SensorReading | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sensor/latest`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data sensor terbaru');
    const data: SensorReading & { message?: string } = await res.json();
    if (data.message || data.nilai_ketinggian === undefined) return createDemoLatestReading();
    return data;
  } catch (error) {
    console.error('getLatestSensorReading Error:', error);
    return createDemoLatestReading();
  }
}

export async function getSensorHistory(limit = 50): Promise<SensorReading[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sensor/history?limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil riwayat sensor');
    const data = await res.json();
    const readings: SensorReading[] = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    return readings.length > 0 ? readings : createDemoSensorHistory(limit);
  } catch (error) {
    console.error('getSensorHistory Error:', error);
    return createDemoSensorHistory(limit);
  }
}

export async function getSensorDevices(): Promise<SensorDevice[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sensor/devices`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil daftar perangkat sensor');
    return await res.json();
  } catch (error) {
    console.error('getSensorDevices Error:', error);
    return [];
  }
}

export async function updateSensorThreshold(idSensor: string, thresholds: ThresholdUpdatePayload) {
  const res = await fetch(`${API_BASE_URL}/api/sensor/devices/${idSensor}/threshold`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(thresholds),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengubah threshold');
  return data;
}

// 3. Kelompok Rentan Banjir API
export async function getRentanBanjirData(): Promise<RentanBanjirData[]> {
  try {
    // Revalidate every 30s — data changes when admin saves
    const res = await fetch(`${API_BASE_URL}/api/rentan-banjir`, { next: { revalidate: 30 } } as RequestInit);
    if (!res.ok) throw new Error('Gagal mengambil data kelompok rentan');
    return await res.json();
  } catch (error) {
    console.error('getRentanBanjirData Error:', error);
    return [];
  }
}

export async function getDusunList(): Promise<DusunOption[]> {
  return cachedFetch('dusun-list', async () => {
    const res = await fetch(`${API_BASE_URL}/api/dusun`);
    if (!res.ok) throw new Error('Gagal mengambil daftar dusun');
    return res.json() as Promise<DusunOption[]>;
  });
}

export async function getPosyanduList(): Promise<PosyanduOption[]> {
  return cachedFetch('posyandu-list', async () => {
    const res = await fetch(`${API_BASE_URL}/api/posyandu`);
    if (!res.ok) throw new Error('Gagal mengambil daftar posyandu');
    return res.json() as Promise<PosyanduOption[]>;
  });
}

export async function createPosyandu(payload: { nama_posyandu: string; dusun: string }) {
  const res = await fetch(`${API_BASE_URL}/api/posyandu`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Gagal menambahkan posyandu baru');
  invalidateCache('posyandu-list'); // bust cache so next fetch is fresh
  return data;
}

export async function deletePosyandu(id: number) {
  const res = await fetch(`${API_BASE_URL}/api/posyandu/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Gagal menghapus data posyandu');
  invalidateCache('posyandu-list'); // bust cache so next fetch is fresh
  return data;
}

export async function saveBatchRentanBanjir(payload: {
  id_posyandu?: number;
  nama_posyandu?: string;
  dusun?: string;
  categories: { id_kategori: number; jumlah_jiwa: number }[];
}) {
  const res = await fetch(`${API_BASE_URL}/api/rentan-banjir/batch`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menyimpan data kelompok rentan');
  return data;
}

export async function getKategoriList(): Promise<KategoriOption[]> {
  return cachedFetch('kategori-list', async () => {
    const res = await fetch(`${API_BASE_URL}/api/rentan-banjir/kategori`);
    if (!res.ok) throw new Error('Gagal mengambil daftar kategori');
    return res.json() as Promise<KategoriOption[]>;
  });
}

export async function getRentanBanjirSummary(): Promise<RentanBanjirSummary | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rentan-banjir/summary`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil ringkasan data kelompok rentan');
    return await res.json();
  } catch (error) {
    console.error('getRentanBanjirSummary Error:', error);
    return null;
  }
}

export async function createRentanBanjirData(payload: RentanBanjirPayload) {
  const res = await fetch(`${API_BASE_URL}/api/rentan-banjir`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menambahkan data kelompok rentan');
  return data;
}

export async function updateRentanBanjirData(id: number, payload: RentanBanjirPayload) {
  const res = await fetch(`${API_BASE_URL}/api/rentan-banjir/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengupdate data');
  return data;
}

export async function deleteRentanBanjirData(id: number) {
  const res = await fetch(`${API_BASE_URL}/api/rentan-banjir/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus data');
  return data;
}

// 4. Pengaduan Warga API
export async function submitPengaduan(payload: PengaduanPayload) {
  const res = await fetch(`${API_BASE_URL}/api/pengaduan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengirim pengaduan');
  return data;
}

export async function getPengaduanList(): Promise<PengaduanData[]> {
  const res = await fetch(`${API_BASE_URL}/api/pengaduan`, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengambil daftar pengaduan');
  return data;
}

export async function deletePengaduan(id: number) {
  const res = await fetch(`${API_BASE_URL}/api/pengaduan/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus pengaduan');
  return data;
}

