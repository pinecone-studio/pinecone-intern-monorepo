'use client';

import { Stack } from '@mui/material';
import React from 'react';
import { PaginationFooter } from './_components/PaginationFooter';

const Home = () => {
  return (
    <Stack data-cy="dashboard-page-cy-id">
      Welcome to Cms Dashboard hello
      <PaginationFooter />
    </Stack>
  );
};
export default Home;
