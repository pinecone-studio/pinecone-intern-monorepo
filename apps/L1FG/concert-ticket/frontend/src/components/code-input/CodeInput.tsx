'use client';
import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { MoveLeft } from 'lucide-react';

const CodeInput = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="border border-[#27272A]  p-8 rounded-xl w-96">
        <h2 className="text-gray-200 text-center mb-6 text-sm">Имэйл хаяг руу илгээсэн 4 оронтой кодыг оруулна уу</h2>

        <div className="flex justify-center mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border border-gray-700 rounded-lg bg-transparent text-white text-center text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          ))}
        </div>

        <div data-testid="icons-container" className="flex justify-between text-white text-sm px-2">
          <MoveLeft />
          <RefreshCw />
        </div>
      </div>
    </div>
  );
};

export default CodeInput;
