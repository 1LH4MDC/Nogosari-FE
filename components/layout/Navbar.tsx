'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from '@/components/common';

const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil Destana', href: '/profil' },
  { name: 'Layanan', href: '/layanan' },
  { name: 'Monitoring IoT', href: '/monitoring' },
  { name: 'Data', href: '/data' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 2. Scroll Behavior: Detect scroll Y > 20px
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/forgot-password');
  const actionButtonText = isAuthPage ? 'Kembali' : 'Masuk';
  const actionButtonHref = isAuthPage ? '/' : '/login';

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.82)' : 'rgba(255, 255, 255, 0.95)',
        boxShadow: isScrolled ? '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)' : 'none',
        borderColor: isScrolled ? 'rgba(229, 231, 235, 0.7)' : 'rgba(243, 244, 246, 1)',
      }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
    >
      <div className="container relative mx-auto flex h-20 items-center justify-between px-4 md:px-8">

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

        {/* 1. Desktop Links (Centered with sliding activeTab layoutId indicator) */}
        <div className="hidden items-center gap-8 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1.5 text-sm font-semibold transition-colors ${isActive ? 'text-[#1d4ed8] font-extrabold' : 'text-gray-600 hover:text-[#1d4ed8]'
                  }`}
              >
                {link.name}

                {/* Sliding underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-[#1d4ed8] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="hidden items-center md:flex">
          <Link
            href={actionButtonHref}
            className="rounded-xl bg-[#1d4ed8] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-800 hover:shadow-md cursor-pointer"
          >
            {actionButtonText}
          </Link>
        </div>

        {/* 3. Mobile Menu Toggle Icon (Morphing Animation) */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden text-gray-600 hover:text-[#1d4ed8] p-2 rounded-lg transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div
            key={isMobileMenuOpen ? 'close' : 'menu'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>
      </div>

      {/* 3. Mobile Menu Transition (Hamburger Drawer with Staggered Entrance) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-4 md:hidden shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-blue-50 text-[#1d4ed8] font-bold' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: NAV_LINKS.length * 0.05 }}
                className="pt-2"
              >
                <Link
                  href={actionButtonHref}
                  className="inline-flex w-full justify-center rounded-xl bg-[#1d4ed8] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-800 shadow-2xs"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {actionButtonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

