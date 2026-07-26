import Link from 'next/link';
import { MapPin, Clock, Mail } from 'lucide-react';
import Logo from '@/components/common/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#f0f4f8] pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {/* Logo & Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <Logo size={36} className="h-9 w-9" iconClassName="h-5 w-5" />
              <span className="text-lg font-bold text-gray-900">
                Kampung Tanggap Bencana
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Mewujudkan Desa Nogosari tangguh bencana melalui program LIMA-SI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-gray-900">Tautan Penting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-blue-600 underline underline-offset-4">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 underline underline-offset-4">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 underline underline-offset-4">
                  Peta Situs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-gray-900">Informasi Desa Tangguh Bencana</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>
                  Jl. Raya Desa Nogosari No. 1, Kecamatan XYZ, Kabupaten ABC,
                  Provinsi Jawa Timur 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-blue-600" />
                <span>Senin - Jumat: 08:00 - 15:00 WIB</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-blue-600" />
                <span>kontak@nogosari.desa.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-gray-200/80 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 Pemerintah Desa Nogosari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
