'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to OTP verification step
    router.push('/forgot-password/verify');
  };

  return (
    <AuthLayout title="Masukkan Email Anda">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* CTA Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#1d4ed8] hover:bg-blue-800 text-white font-extrabold py-3.5 text-sm transition-all shadow-xs hover:shadow-md"
        >
          Kirim
        </button>
      </form>
    </AuthLayout>
  );
}
