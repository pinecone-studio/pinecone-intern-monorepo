'use client';

import { Stack, Typography } from '@mui/material';
import { NextPageButton, References } from '../../../components';

const references = [
  {
    label: 'Apollo server',
    path: 'https://www.apollographql.com/docs/apollo-server/',
    description: 'Apollo Server is an open-source, spec-compliant GraphQL server that&lsquo;s compatible with any GraphQL client, including Apollo Client.',
  },
];

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        Apollo server
      </Typography>

      <Typography py={2} color="text.secondary">
        Apollo Server is an open-source, spec-compliant GraphQL server that&lsquo;s compatible with any GraphQL client, including Apollo Client. It&lsquo;s the best way to build a production-ready,
        self-documenting GraphQL API that can use data from any source.
      </Typography>

      <References items={references} />

      <NextPageButton label="Apollo Client" path="/graphql/apollo-client" />
    </Stack>
  );
};

export default Page;
