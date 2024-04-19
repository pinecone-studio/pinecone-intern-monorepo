import React from 'react';
import { render } from '@testing-library/react';
import DashboardTable from '../../src/app/dashboard/_components/DashboardTable';
import { useGetArticlesQuery } from '../../src/generated/';

jest.mock('../../src/generated/', () => ({
  useGetArticlesQuery: jest.fn(),
}));

describe('Dashboard Table', () => {
  it('Should render', () => {
    const mockData = {
      getArticles: [
        {
          title: 'ss',
          status: 's',
          createdAt: 's',
        },
      ],
    };

    (useGetArticlesQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    const { container } = render(<DashboardTable />);
    expect(container).toBeDefined();
  });
});
