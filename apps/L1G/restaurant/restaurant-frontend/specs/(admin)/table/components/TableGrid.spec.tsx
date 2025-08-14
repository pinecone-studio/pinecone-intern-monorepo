import { TableGrid } from '@/components/table/TableGrid';
import { GetTablesDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { ErrorBoundary } from 'specs/utils/ErrorBoundary';
import '@testing-library/jest-dom';

const getTablesMock: MockedResponse = {
  request: {
    query: GetTablesDocument,
  },
  result: {
    data: {
      getTables: [
        {
          tableId: 'test1',
          tableName: 'Table1',
          tableQr: 'https://test1.png',
        },
        {
          tableId: 'test2',
          tableName: 'Table2',
          tableQr: 'https://test2.png',
        },
      ],
    },
  },
};

const getTablesEmptyMock: MockedResponse = {
  request: {
    query: GetTablesDocument,
  },
  result: {
    data: {
      getTables: [],
    },
  },
};

const getTablesErrorMock: MockedResponse = {
  request: {
    query: GetTablesDocument,
  },
  error: new Error('Network error'),
};

describe('TableGrid Component', () => {
  it('should render table list', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[getTablesMock]} addTypename={false}>
        <TableGrid />
      </MockedProvider>
    );

    await waitFor(() => {
      const tables = getAllByTestId('admin-table');
      expect(tables).toHaveLength(2);
      expect(tables[0]).toHaveTextContent('Table1');
      expect(tables[1]).toHaveTextContent('Table2');
    });
  });

  it('should display empty message when no tables', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getTablesEmptyMock]} addTypename={false}>
        <TableGrid />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('admin-empty-message')).toBeDefined();
    });
  });

  it('should show error boundary on query error', async () => {
    const { getByTestId } = render(
      <ErrorBoundary fallback={<div data-testid="error">Error</div>}>
        <MockedProvider mocks={[getTablesErrorMock]} addTypename={false}>
          <TableGrid />
        </MockedProvider>
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(getByTestId('error')).toBeDefined();
    });
  });
});
