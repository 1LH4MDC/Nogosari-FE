'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Clock } from 'lucide-react';
import { Logo } from '@/components/common';

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password')
  ) {
    return null;
  }
  return (
    <footer className="bg-[#f8fafc] border-t border-gray-100 pt-14 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12 pb-12 border-b border-gray-200/60">
          
          {/* Col 1: Branding & Intro */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <Logo size={40} className="h-10 w-10 shrink-0" iconClassName="h-5 w-5" />
              <span className="text-lg font-bold text-[#1e3a8a]">
                Desa Nogosari Tangguh Bencana
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              Mewujudkan Desa Nogosari tangguh bencana melalui program LIMA-SI.
            </p>
          </div>

          {/* Col 2: Jelajahi */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Jelajahi</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/layanan" className="hover:text-blue-600 transition-colors">
                  Modul Mitigasi Bencana
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-blue-600 transition-colors">
                  E-book Gema-Nogosari
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-blue-600 transition-colors">
                  Buku Saku Panduan Aquaponik
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Informasi Kantor Destana */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Informasi Kantor Destana</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span className="leading-snug">
                  Jl. Kyai Hafidz No. 1, Dusun Gumuk Sari, Desa Nogosari, Kecamatan Rambipuji
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-blue-600" />
                <span>Senin - Jumat: 08:00 - 15:00 WIB</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs font-medium text-gray-500">
          <p>© 2026 Pemerintah Desa Nogosari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
