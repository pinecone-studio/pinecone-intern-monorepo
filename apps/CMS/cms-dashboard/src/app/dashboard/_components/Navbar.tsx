import React from 'react';
import { HeaderLogoIcon } from '@/icons';

export const Navbar = () => {
  return (
    <div data-cy="navbar-cy-id" data-testid="navbar" className="px-8 py-4 bg-white">
      <HeaderLogoIcon />
    </div>
  );
};
