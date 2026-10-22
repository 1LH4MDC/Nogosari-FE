# Nogosari Frontend

Frontend SI-Tanggap untuk **Desa Nogosari Tanggap Bencana**. Aplikasi ini menyediakan informasi desa, layanan, pemantauan sensor IoT, dan dashboard administrasi.

## Teknologi

- Next.js 16 dengan App Router
- React 19 dan TypeScript
- Tailwind CSS 4
- Recharts untuk grafik monitoring
- Framer Motion untuk animasi antarmuka

## Persyaratan

- Node.js 20 atau lebih baru
- npm
- Backend Nogosari berjalan atau URL backend yang dapat diakses

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka [http://localhost:3001](http://localhost:3001).

Atur URL backend pada `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Jika variabel ini tidak diatur, frontend memakai path API relatif pada origin yang sama.

## Halaman utama

| Path          | Keterangan                                                |
| ------------- | --------------------------------------------------------- |
| `/`           | Beranda Desa Nogosari Tanggap Bencana                     |
| `/profil`     | Profil, visi misi, dan tupoksi DESTANA                    |
| `/layanan`    | Informasi program dan layanan desa                        |
| `/monitoring` | Bacaan sensor, grafik ketinggian air, status, dan riwayat |
| `/login`      | Login administrator                                       |
| `/admin`      | Dashboard administrasi                                    |
| `/data`       | Data kelompok rentan banjir                               |

## Monitoring ketinggian air

Halaman `/monitoring` mengambil bacaan terbaru dan riwayat dari endpoint sensor backend. Nilai `nilai_ketinggian` disimpan dalam sentimeter dan ditampilkan dalam meter. Grafik menampilkan data historis dengan zona ambang berikut:

| Status | Ketinggian              |
| ------ | ----------------------- |
| Aman   | 0 sampai 4 m            |
| Siaga  | lebih dari 4 sampai 6 m |
| Bahaya | lebih dari 6 m          |

Pada batas tepat 4 m, status ditampilkan sebagai Aman. Status Siaga berlaku di atas 4 m hingga 6 m.

Jika API sensor tidak tersedia atau belum memiliki riwayat, frontend otomatis menyediakan bacaan contoh untuk `SN-001` agar halaman dan grafik tetap terisi saat pratinjau.

## Scripts

| Perintah        | Keterangan                                     |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Menjalankan server pengembangan pada port 3001 |
| `npm run build` | Membuat build produksi                         |
| `npm start`     | Menjalankan build produksi pada port 3001      |
| `npm run lint`  | Menjalankan ESLint                             |
