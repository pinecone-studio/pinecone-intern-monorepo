import { AllFoodsCard } from '@/components/admin/AllFoodsCard';
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
