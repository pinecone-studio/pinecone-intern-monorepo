'use client';

import React from 'react';
import Link from 'next/link';
import { CommentsMain } from './_features';

const CommentsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#cccccc', marginTop: 4 }}>
      <CommentsMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default CommentsPage;
