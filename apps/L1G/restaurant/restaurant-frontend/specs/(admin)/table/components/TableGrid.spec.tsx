import { TableGrid } from '@/components/table/TableGrid';
import { GetTablesDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { ErrorBoundary } from 'specs/utils/ErrorBoundary';

const getTablesMock: MockedResponse = {
  request: {
    query: GetTablesDocument,
  },
  result: {
    data: {
      getTables: [
        {
          tableId: 'test',
          tableName: 'test',
          tableQr: 'https://test.png',
        },
      ],
    },
  },
};

const getTablesErrorMock: MockedResponse = {
  request: {
    query: GetTablesDocument,
  },
  error: new Error('Error: Network error'),
};

describe('getTables', () => {
  it('should render', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[getTablesMock]} addTypename={false}>
        <TableGrid />
      </MockedProvider>
    );
    await waitFor(() => {
      const tables = getAllByTestId('admin-table')[0];
      expect(tables).toBeDefined();
    });
  });
  it('should throw error when getTables failed', async () => {
    const { getByTestId } = render(
      <ErrorBoundary fallback={<div data-testid="error">Error</div>}>
        <MockedProvider mocks={[getTablesErrorMock]} addTypename={false}>
          <TableGrid />
        </MockedProvider>
      </ErrorBoundary>
    );

    await waitFor(() => expect(getByTestId('error')).toBeDefined());
  });
});
