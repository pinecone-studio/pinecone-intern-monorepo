import { AllFoodsCard } from '@/components/admin';
import React from 'react';
import { Toaster } from 'sonner';

export default function page() {
  return (
    <div>
      <AllFoodsCard />
      <Toaster />
    </div>
  );
}
