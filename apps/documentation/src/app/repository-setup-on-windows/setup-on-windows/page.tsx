/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Repository setup on Windows Guide
      </Typography>

      <Stack my={2}>
        <Typography variant="h6" fontWeight="bold">
          <Link href={' https://github.com/Vets-Who-Code/windows-dev-guide'} target="_blank">
            https://github.com/Vets-Who-Code/windows-dev-guide
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Page;
