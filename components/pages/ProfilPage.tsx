import { History, Target } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl md:text-5xl mb-6">
            Mengenal Lebih Dekat Desa<br />Tangguh Bencana
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Menjaga warisan budaya dan sumber daya alam dengan sentuhan teknologi modern
            untuk masa depan yang lebih cerah dan berkelanjutan.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">

          {/* Sejarah (Left Column) */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <History className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-900">Sejarah Desa Tangguh Bencana</h2>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                Desa Nogosari memiliki rekam jejak panjang sebagai komunitas agraris yang
                sangat bergantung pada kelestarian tata air. Sejak puluhan tahun lalu, leluhur desa
                ini telah membangun sistem irigasi komunal yang mengairi sawah-sawah
                terasering.
              </p>
              <p>
                Kini, sejalan dengan perkembangan zaman, tradisi gotong royong tersebut kami
                padukan dengan teknologi pemantauan IoT (Internet of Things) untuk memastikan
                kualitas dan kuantitas air tetap terjaga demi kesejahteraan seluruh warga.
              </p>
            </div>
          </div>

          {/* Visi & Misi (Right Column) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visi */}
            <div className="rounded-2xl bg-[#1d4ed8] p-8 text-white shadow-sm">
              <h2 className="text-xl font-bold mb-4">Visi Destana</h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed italic">
                "Terwujudnya Desa Nogosari yang Mandiri, Sejahtera, dan Berkelanjutan melalui Harmoni Alam dan Teknologi."
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-2xl bg-[#dbeafe] p-8 text-blue-950 shadow-sm flex-1">
              <h2 className="text-xl font-bold mb-4 text-blue-900">Misi Destana</h2>
              <ul className="space-y-3 text-sm sm:text-base text-blue-900/90">
                <li className="flex items-start gap-2">
                  <span className="select-none">•</span>
                  <span>Meningkatkan kualitas tata kelola air desa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="select-none">•</span>
                  <span>Mendorong adopsi teknologi tepat guna.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="select-none">•</span>
                  <span>Memberdayakan ekonomi masyarakat lokal.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tupoksi */}
        <div className="mx-auto max-w-4xl text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Tugas Pokok dan Fungsi<br />Desa Tangguh Bencana
          </h2>
          <p className="text-xs uppercase font-medium tracking-widest text-gray-400">
            TUPOKSI
          </p>
        </div>

        {/* Peta Desa */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Peta Desa Tangguh Bencana</h2>
            <p className="text-gray-500">Potret kehidupan dan inovasi PPK Ormawa di Nogosari.</p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
            {/* Title inside card */}
            <div className="absolute top-6 left-8 z-20">
              <h3 className="text-2xl font-extrabold text-blue-900">Peta Lokasi Desa</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 pt-16">
              {/* Info Panel */}
              <div className="md:col-span-6 p-8 lg:p-10 bg-white/70 backdrop-blur-md z-10 flex flex-col justify-between">
                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Batas Desa:</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm text-gray-800">
                      <div>
                        <span className="block text-gray-900 font-bold mb-0.5">Utara</span>
                        <span className="text-gray-600 font-semibold">DESA KALIWINING</span>
                      </div>
                      <div>
                        <span className="block text-gray-900 font-bold mb-0.5">Timur</span>
                        <span className="text-gray-600 font-semibold">DESA MANGARAN</span>
                      </div>
                      <div>
                        <span className="block text-gray-900 font-bold mb-0.5">Selatan</span>
                        <span className="text-gray-600 font-semibold">DESA GLUNDENGAN</span>
                      </div>
                      <div>
                        <span className="block text-gray-900 font-bold mb-0.5">Barat</span>
                        <span className="text-gray-600 font-semibold">DESA GUMELAR</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-300/60 pt-4 text-sm">
                    <span className="font-bold text-gray-900">Luas Desa:</span>
                    <span className="text-gray-700 font-medium">1.989,49 Ha</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-300/60 pt-4 text-sm">
                    <span className="font-bold text-gray-900">Jumlah Penduduk:</span>
                    <span className="text-gray-700 font-medium">22.000 Jiwa</span>
                  </div>
                </div>
              </div>

              {/* Map Illustration / Google Maps Embed */}
              <div className="md:col-span-6 relative min-h-[350px] md:min-h-[420px] bg-gray-100 overflow-hidden">
                <iframe
                  title="Google Maps Batas Wilayah Desa Nogosari"
                  src="https://maps.google.com/maps?q=Desa+Nogosari,+Rambipuji,+Jember&t=m&z=13&ie=UTF8&iwloc=none&output=embed"
                  className="absolute -top-36 -left-20 w-[140%] h-[155%] border-0 pointer-events-auto"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
