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
          src="https://www.youtube.com/embed/axvKBxTTMPU?si=F2OQuoeZzlR2Uk6r"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Stack>

      <NextPageButton label="Repository Clone" path="/github-repository-setup/repository-clone" />
    </Stack>
  );
};

export default Page;
