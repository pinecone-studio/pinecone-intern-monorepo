/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';
import { NextPageButton } from '../../../components';

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Github Project
      </Typography>
      <Stack my={2}></Stack>

      <NextPageButton label="Pull Request Merge" path="/pull-request/pull-request-merge" />
    </Stack>
  );
};

export default Page;
