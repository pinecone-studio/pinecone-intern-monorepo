'use client';

import { Stack, Typography } from '@mui/material';
import { NextPageButton, References } from '../../../components';

const references = [
  {
    label: 'GraphQL Codegen',
    path: 'https://the-guild.dev/graphql/codegen',
    description: 'Generate code from your GraphQL schema and operations with a simple CLI',
  },
];

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        GraphQL Codegen
      </Typography>

      <Typography py={2} color="text.secondary">
        Generate code from your GraphQL schema and operations with a simple CLI
      </Typography>

      <References items={references} />

      <NextPageButton label="Unit testing" path="/testing/unit" />
    </Stack>
  );
};

export default Page;
