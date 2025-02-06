'use client';

import type React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  speed?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, color = 'currentColor', speed = 1.5 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="relative inline-block"
    >
      <motion.span
        className="block w-full h-full rounded-full border-4 border-t-transparent"
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
};
