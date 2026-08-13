import {
  AuthResponse,
  SensorReading,
  SensorDevice,
  ThresholdUpdatePayload,
  RentanBanjirData,
  RentanBanjirPayload,
  PengaduanData,
  PengaduanPayload,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nogosari-be.vercel.app/';

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
    return await res.json();
  } catch (error) {
    console.error('getLatestSensorReading Error:', error);
    return null;
  }
}

export async function getSensorHistory(limit = 50): Promise<SensorReading[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sensor/history?limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil riwayat sensor');
    return await res.json();
  } catch (error) {
    console.error('getSensorHistory Error:', error);
    return [];
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
    const res = await fetch(`${API_BASE_URL}/api/rentan-banjir`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data kelompok rentan');
    return await res.json();
  } catch (error) {
    console.error('getRentanBanjirData Error:', error);
    return [];
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

