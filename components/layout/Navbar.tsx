'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/common/Logo';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Profil Destana', href: '/profil' },
  { name: 'Layanan', href: '/layanan' },
  { name: 'Monitoring IoT', href: '/monitoring' },
  { name: 'Data', href: '/data' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/forgot-password');
  const actionButtonText = isAuthPage ? 'Kembali' : 'Masuk';
  const actionButtonHref = isAuthPage ? '/' : '/login';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <Logo size={44} className="h-11 w-11 shrink-0" />
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight text-[#1e3a8a]">
              Desa Nogosari Tangguh Bencana
            </span>
            <span className="text-xs text-gray-500 font-medium">Kabupaten Jember</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-b-2 border-blue-600 py-1 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="hidden items-center md:flex">
          <Link
            href={actionButtonHref}
            className="rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-800 hover:shadow-md"
          >
            {actionButtonText}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden shadow-lg">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href={actionButtonHref}
              className="inline-flex justify-center rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {actionButtonText}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
