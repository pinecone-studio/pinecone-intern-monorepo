import { MenuCardAdmin } from '@/components/admin';
import React from 'react';
import { Toaster } from 'sonner';

const MenuPage = () => {
  return (
    <div>
      <MenuCardAdmin />
      <Toaster />
    </div>
  );
};

export default MenuPage;
