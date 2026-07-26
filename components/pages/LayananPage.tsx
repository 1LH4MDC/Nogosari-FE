import {
  BookOpen, Users, Leaf, Home, Bell,
  CheckCircle2
} from 'lucide-react';

export default function LayananPage() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-800 font-medium px-4 py-1.5 rounded-full text-sm mb-6">
            Program Unggulan
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-6">
            Layanan Desa: <span className="text-blue-700">Program LIMA-SI</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Inisiatif komprehensif Desa Nogosari dalam membangun ketangguhan komunitas
            terhadap bencana melalui edukasi, inklusivitas, manajemen lingkungan, dan
            infrastruktur perlindungan terpadu.
          </p>
        </div>

        <div className="space-y-24">

          {/* SI-KENCANA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">SI-KENCANA</h2>
              <p className="text-blue-600 font-medium text-sm mb-6">Strategi Edukasi dan Kesiapsiagaan Bencana</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Program ini berfokus pada peningkatan kapasitas masyarakat melalui edukasi
                terstruktur. Kami menyediakan modul pelatihan, simulasi rutin, dan sosialisasi
                mitigasi bencana untuk memastikan setiap warga siap dan tanggap menghadapi
                kondisi darurat.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Penyusunan Modul Mitigasi Bencana Lokal</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Simulasi Evakuasi Berkala di Tingkat RT/RW</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Edukasi Kesiapsiagaan di Sekolah Dasar</span>
                </li>
              </ul>
              <button className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-800">
                Unduh Modul Panduan
              </button>
            </div>
            <div className="order-1 lg:order-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
              </div>
            </div>
          </div>

          {/* SI-Care */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
              </div>
            </div>
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">SI-Care</h2>
              <p className="text-red-600 font-medium text-sm mb-6">Sistem Identifikasi Cepat Kelompok Rentan</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Sistem identifikasi dan pemasangan label prioritas pada rumah kelompok rentan
                untuk memastikan mereka mendapat prioritas utama saat evakuasi darurat.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-medium text-gray-700">Lansia</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-medium text-gray-700">Ibu Hamil</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-medium text-gray-700">Disabilitas</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-medium text-gray-700">Anak-anak</span>
                </div>
              </div>
            </div>
          </div>

          {/* SI-Rasa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Leaf className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">SI-Rasa</h2>
              <p className="text-green-700 font-medium text-sm mb-6">Sistem Rumah Aman Sampah</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Mengelola risiko lingkungan dengan pemilahan sampah yang tepat. Program ini
                bertujuan mewujudkan Zero Waste Village dengan mengedukasi warga tentang
                kategori utama sampah.
              </p>
              <div className="flex items-center gap-3 bg-green-100 text-green-800 px-6 py-4 rounded-xl font-medium w-fit">
                <CheckCircle2 className="h-5 w-5" />
                Target: Zero Waste Village
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-center font-bold text-gray-900 mb-6">Kategori Pemilahan</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="aspect-square flex flex-col items-center justify-center gap-2 bg-green-500 text-white rounded-xl p-2 text-center shadow-md">
                  <Leaf className="h-6 w-6" />
                  <span className="text-xs font-medium">Organik</span>
                </div>
                <div className="aspect-square flex flex-col items-center justify-center gap-2 bg-yellow-500 text-white rounded-xl p-2 text-center shadow-md">
                  <div className="h-6 w-6 font-bold text-xl">♻</div>
                  <span className="text-xs font-medium">Anorganik</span>
                </div>
                <div className="aspect-square flex flex-col items-center justify-center gap-2 bg-red-500 text-white rounded-xl p-2 text-center shadow-md">
                  <span className="h-6 w-6 font-bold text-xl">⚠</span>
                  <span className="text-xs font-medium">B3</span>
                </div>
                <div className="aspect-square flex flex-col items-center justify-center gap-2 bg-gray-700 text-white rounded-xl p-2 text-center shadow-md">
                  <span className="h-6 w-6 font-bold text-xl">⛾</span>
                  <span className="text-xs font-medium">Residu</span>
                </div>
              </div>
            </div>
          </div>

          {/* SI-Larung */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
            </div>
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Home className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">SI-Larung</h2>
              <p className="text-blue-600 font-medium text-sm mb-6">Sistem Evakuasi dan Layanan Adopsi Ramah Lingkungan</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Penyediaan titik kumpul dan shelter sementara yang terintegrasi dengan layanan
                kesehatan. Dilengkapi fasilitas ketahanan pangan mandiri seperti kebun hidroponik
                dan budidaya sayuran.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <Home className="h-6 w-6 text-blue-600 shrink-0" />
                  <span className="font-medium text-gray-800">Infrastruktur Rumah Lindung Darurat</span>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <Leaf className="h-6 w-6 text-green-600 shrink-0" />
                  <span className="font-medium text-gray-800">Budidaya Sayuran & Hidroponik Mandiri</span>
                </li>
              </ul>
              <button className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-800">
                Detail Fasilitas Shelter
              </button>
            </div>
          </div>

          {/* SI-Tanggap */}
          <div className="mx-auto max-w-4xl text-center pt-12">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mx-auto">
              <Bell className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">SI-Tanggap</h2>
            <p className="text-blue-600 font-medium text-sm mb-6">Sistem Monitoring dan Peringatan Dini Real-time</p>
            <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              SI-Tanggap merupakan sistem monitoring kondisi lingkungan desa secara real-time
              melalui sensor IoT untuk mendeteksi potensi bencana lebih awal. Sistem ini
              mencakup pemantauan ketinggian air sungai, kondisi cuaca, dan memberikan
              peringatan dini yang akurat bagi seluruh warga desa.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Monitoring Air Sungai 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Notifikasi Peringatan Dini Otomatis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Visualisasi Data Sensor</span>
              </div>
            </div>

            <button className="rounded-lg bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-800 shadow-lg shadow-blue-200">
              Lihat Dashboard Monitoring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
