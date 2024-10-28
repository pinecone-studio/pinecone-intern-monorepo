/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Run Project
      </Typography>
      <Stack my={2}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HMrc1SznYz4?si=QmLomCzm9iR5lz2Q"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Stack>
    </Stack>
  );
};

export default Page;
