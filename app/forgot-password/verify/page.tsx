'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import OtpInput from '@/components/common/OtpInput';

export default function OtpVerifyPage() {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode) {
      // Redirect to Reset Password step
      router.push('/forgot-password/reset');
    } else {
      router.push('/forgot-password/reset');
    }
  };

  return (
    <AuthLayout
      title="Masukkan Kode OTP"
      subtitle="Kode OTP telah dikirim ke email anda"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Fields */}
        <OtpInput
          length={6}
          onChange={(code) => setOtpCode(code)}
          onComplete={(code) => setOtpCode(code)}
        />

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
