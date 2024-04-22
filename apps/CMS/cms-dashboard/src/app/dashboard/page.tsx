'use client';

import { Stack } from '@mui/material';
import React from 'react';
import { PaginationFooter } from './_components/PaginationFooter';
import { MenuBar } from './_features';

const Home = () => {
  return (
    <Stack data-cy="dashboard-page-cy-id">
      <MenuBar />
      Welcome to Cms Dashboard hello
      <PaginationFooter />
    </Stack>
  );
};
export default Home;
