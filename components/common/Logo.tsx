'use client';

import Image from 'next/image';
import { Shield } from 'lucide-react';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  size?: number;
}

export default function Logo({ size = 44, className = "h-11 w-11", iconClassName = "h-6 w-6" }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 ${className}`}>
        <Shield className={`${iconClassName} stroke-[2]`} />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src="/logo.webp"
        alt="Logo Desa Nogosari"
        width={size}
        height={size}
        className="object-contain w-full h-full"
        onError={() => setImageError(true)}
        priority
      />
    </div>
  );
}
