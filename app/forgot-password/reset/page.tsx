'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '@/components';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }
    // Simulate successful password change & redirect to login
    router.push('/login');
  };

  return (
    <AuthLayout title="Ubah Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password baru anda"
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

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 block">Konfirmasi Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi Password baru anda"
              className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-300 focus:border-[#1d4ed8] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* CTA Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 rounded-xl bg-[#1d4ed8] hover:bg-blue-800 text-white font-extrabold py-3.5 text-sm transition-all shadow-xs hover:shadow-md"
        >
          Ubah
        </button>
      </form>
    </AuthLayout>
  );
}
