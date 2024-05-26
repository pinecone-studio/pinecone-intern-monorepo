import React from 'react';
import { HeaderLogoIcon } from '@/icons';
import { NAV_BAR_HEIGHT } from '@/common/variables';

export const Navbar = () => {
  return (
    <div data-cy="navbar-cy-id" data-testid="navbar" className="px-4 bg-white flex items-center" style={{ height: NAV_BAR_HEIGHT }}>
      <HeaderLogoIcon />
    </div>
  );
};
