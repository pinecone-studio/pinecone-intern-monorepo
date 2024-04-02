'use client';

import { Stack, Typography } from '@mui/material';
import { NextPageButton, References } from '../../../components';

const references = [
  {
    label: 'Apollo Client React',
    path: 'https://www.apollographql.com/docs/react/',
    description: 'Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.',
  },
];

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Apollo Client React
      </Typography>

      <Typography py={2} color="text.secondary">
        Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application
        data, all while automatically updating your UI.
      </Typography>

      <References items={references} />

      <NextPageButton label="Codegen" path="/graphql/codegen" />
    </Stack>
  );
};

export default Page;
