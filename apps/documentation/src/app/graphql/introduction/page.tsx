/* eslint-disable no-secrets/no-secrets */
'use client';

import { Stack, Typography } from '@mui/material';
import { NextPageButton, References } from '../../../components';

const references = [
  {
    label: 'GraphQL Introduction',
    path: 'https://graphql.org/learn/',
    description: 'Learn the basics of GraphQL',
  },
  {
    label: 'How to GraphQL',
    path: 'https://www.howtographql.com/basics/0-introduction/',
    description: 'A fullstack tutorial website to learn all about GraphQL',
  },
  {
    label: 'GraphQL Explained in 100 Seconds',
    path: 'https://youtu.be/eIQh02xuVw4?si=XKBtj66CUcsWgkzE',
    description: 'A short video that explains the basics of GraphQL',
  },
];

const Page = () => {
  return (
    <Stack>
      <Typography variant="h4" fontWeight="bold">
        GraphQL Introduction
      </Typography>

      <Typography py={2} color="text.secondary">
        GraphQL is a query language and runtime for APIs. It is used to build and consume web service APIs.
      </Typography>

      <Typography py={2} color="text.secondary">
        GraphQL allows clients to make a single API call to request exactly the data they need, in a predictable format. This allows for more efficient and flexible data retrieval, compared to
        traditional REST APIs where the client has to make multiple API calls to different endpoints, and may receive more data than it needs.
      </Typography>

      <Typography py={2} color="text.secondary">
        With GraphQL, the client defines the structure of the data it needs, by sending a query to the server. The server then returns the requested data in the same structure, as defined by the
        query. The client can also make mutations to update or create data on the server.
      </Typography>

      <Stack my={2} borderRadius={2} overflow="hidden">
        <video controls>
          <source src="http://localhost:4200/videos/video1.mov" type="video/mp4" />
        </video>
      </Stack>

      <References items={references} />

      <NextPageButton label="Apollo Server" path="/graphql/apollo-server" />
    </Stack>
  );
};

export default Page;
