'use client';

import React from 'react';
import { Container } from '@mui/material';
import DashboardTable from './_components/DashboardTable';

const Home = () => {
  return (
    <Container data-cy="dashboard-page-cy-id" maxWidth="lg">
      <DashboardTable />
    </Container>
  );
};

export default Home;
