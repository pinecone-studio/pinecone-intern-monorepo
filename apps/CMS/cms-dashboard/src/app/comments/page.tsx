'use client';

import React from 'react';
import Link from 'next/link';
import { CommentsMain } from './_features';
import { Grid } from '@mui/material';

const CommentsPage = () => {
  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#cccccc', mt: 4 }}>
      <CommentsMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </Grid>
  );
};

export default CommentsPage;
