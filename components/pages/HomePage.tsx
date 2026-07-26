import Link from 'next/link';
import { Droplet, Info } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-lg">
          Selamat Datang di <br />
          <span className="text-white">Desa Tangguh Bencana</span>
        </h1>
        
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white/90 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
            Membangun masa depan yang berkelanjutan melalui integrasi teknologi 
            Internet of Things (IoT) untuk pemantauan sumber daya air dan 
            pemberdayaan masyarakat.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/monitoring"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-800 hover:shadow-lg sm:w-auto"
          >
            <Droplet className="h-5 w-5" />
            Pantau Air Real-time
          </Link>
          <Link
            href="/profil"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg sm:w-auto"
          >
            <Info className="h-5 w-5" />
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </div>
  );
}
