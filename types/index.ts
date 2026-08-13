// 1. Auth Types
export interface AdminUser {
  id: number;
  email: string;
  nama?: string;
  role?: string;
}

export interface AuthResponse {
  message?: string;
  error?: string;
  token?: string;
  admin?: AdminUser;
  user?: AdminUser;
}

// 2. Sensor & IoT Types
export interface SensorReading {
  id_bacaan?: number;
  ketinggian_air?: number;
  reading?: number;
  water_level?: number;
  status_siaga?: 'Aman' | 'Waspada' | 'Siaga' | 'Bahaya' | string;
  status_water?: string;
  battery?: number;
  signal?: string;
  timestamp?: string;
  waktu_bacaan?: string;
  created_at?: string;
}

export interface SensorDevice {
  id_sensor: string;
  nama_sensor: string;
  lokasi: string;
  threshold_waspada: number;
  threshold_siaga: number;
  threshold_bahaya: number;
}

export interface ThresholdUpdatePayload {
  threshold_waspada?: number;
  threshold_siaga?: number;
  threshold_bahaya?: number;
}

// 3. Kelompok Rentan Banjir Types
export interface RentanBanjirData {
  id_rentan?: number;
  id?: number;
  id_posyandu: number;
  nama_posyandu?: string;
  dusun?: string;
  id_kategori: number;
  nama_kategori?: string;
  jumlah_jiwa: number;
  created_at?: string;
}

export interface RentanBanjirPayload {
  id_posyandu: number;
  id_kategori: number;
  jumlah_jiwa: number;
}

export interface DusunOption {
  id: number;
  nama_dusun: string;
}

export interface PosyanduOption {
  id: number;
  nama_posyandu: string;
  dusun: string;
  id_dusun?: number;
}

export interface KategoriOption {
  id: number;
  nama_kategori: string;
}

export interface RentanBanjirSummary {
  total_jiwa: number;
  total_records: number;
  by_kategori: { id: number; nama_kategori: string; total_jiwa: number }[];
  by_posyandu: { id: number; nama_posyandu: string; dusun: string; total_jiwa: number }[];
}

// 4. Pengaduan Warga Types
export interface PengaduanData {
  id_pengaduan: number;
  nama_pengirim: string;
  kontak: string;
  isi_pengaduan: string;
  created_at?: string;
}

export interface PengaduanPayload {
  nama_pengirim: string;
  kontak: string;
  isi_pengaduan: string;
}
