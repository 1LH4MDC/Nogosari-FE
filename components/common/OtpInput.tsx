'use client';

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react';
import { motion } from 'framer-motion';

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
}

export default function OtpInput({ length = 6, onComplete, onChange }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [activeInput, setActiveInput] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateOtpValue = (newOtp: string[]) => {
    setOtp(newOtp);
    const combined = newOtp.join('');
    if (onChange) onChange(combined);
    if (combined.length === length && !newOtp.includes('')) {
      if (onComplete) onComplete(combined);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.slice(-1); // Take last character entered
    if (!/^\d*$/.test(val)) return; // Digits only

    const newOtp = [...otp];
    newOtp[index] = val;
    updateOtpValue(newOtp);

    // Auto focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Empty current box -> move to previous
        inputRefs.current[index - 1]?.focus();
        setActiveInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, length).split('');
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    updateOtpValue(newOtp);

    // Focus last pasted or next empty input
    const nextFocusIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
    setActiveInput(nextFocusIndex);
  };

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3.5 my-6">
      {otp.map((digit, idx) => (
        <motion.div
          key={idx}
          whileFocus={{ scale: 1.05 }}
          className="relative flex-1"
        >
          <input
            ref={(el) => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onFocus={() => setActiveInput(idx)}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            className={`w-full h-14 text-center text-xl font-extrabold rounded-xl border bg-white transition-all outline-none ${
              activeInput === idx
                ? 'border-[#1d4ed8] ring-2 ring-blue-100 shadow-sm'
                : digit
                ? 'border-blue-400 bg-blue-50/30'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}
