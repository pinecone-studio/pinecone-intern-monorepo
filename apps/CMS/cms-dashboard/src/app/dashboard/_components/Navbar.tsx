import React from 'react';
import { Stack } from '@mui/material';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <Stack data-cy="navbar-cy-id" px={4} py={1.7} bgcolor={'#FFF'} data-testid="navbar">
      <Image src={'Logo.svg'} alt="" width={36} height={36} />
    </Stack>
  );
};
