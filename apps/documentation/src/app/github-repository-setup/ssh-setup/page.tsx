/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';
import { NextPageButton } from '../../../components';

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        SSH
      </Typography>
      <Stack my={2}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/rXJGNnHTYBA?si=BEAGyBSDLXV3_nHC"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </Stack>

      <NextPageButton label="Repository Clone" path="/github-repository-setup/repository-clone" />
    </Stack>
  );
};

export default Page;
