/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Repository Clone
      </Typography>
      <Stack my={2}>
        <iframe
          width="560"
          height="315"
          src="https://youtu.be/8OTxf_Ee2NU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </Stack>
    </Stack>
  );
};

export default Page;
