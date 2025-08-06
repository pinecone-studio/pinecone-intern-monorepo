import { TableGrid } from '@/components/table/TableGrid';
import { GetTablesDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

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

describe('getTables', () => {
  it('should render', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[getTablesMock]}>
        <TableGrid />
      </MockedProvider>
    );
    await waitFor(() => {
      const tables = getAllByTestId('admin-table')[0];
      expect(tables).toBeDefined();
    });
  });
});
