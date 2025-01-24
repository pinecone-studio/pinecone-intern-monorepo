import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetConcertsDocument } from '@/generated';
import { ListPage } from '@/components/list-page/ListPage';

const mocks = [
  {
    request: {
      query: GetConcertsDocument,
    },
    result: {
      data: {
        getConcerts: [], // Match your actual query response structure
      },
    },
  },
];

describe('ListPage Component', () => {
  it('ListPage render successfully', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListPage />
      </MockedProvider>
    );
  });
});
