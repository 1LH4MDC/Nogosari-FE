'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/layout/AuthLayout';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login submit & redirect to home or monitoring
    router.push('/monitoring');
  };

  return (
    <AuthLayout title="Masuk" subtitle="Sebagai Pengurus Desa">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 block">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email anda"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password anda"
              className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-300 focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="pt-0.5">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Lupa Password?
          </Link>
        </div>

        {/* CTA Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 text-white font-extrabold py-3.5 text-sm transition-all shadow-xs hover:shadow-md"
        >
          Masuk
        </button>
      </form>
    </AuthLayout>
  );
}
