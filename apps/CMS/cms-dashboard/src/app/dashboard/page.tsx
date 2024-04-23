'use client';

import React from 'react';
import { Container } from '@mui/material';
import DashboardTable from './_features/DashboardTable';

const Home = () => {
  return (
    <Container data-cy="dashboard-page-cy-id" maxWidth="lg">
      <DashboardTable />
    </Container>
  );
};

export default Home;
