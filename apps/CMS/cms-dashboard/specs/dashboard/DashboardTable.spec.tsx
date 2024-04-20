import React from 'react';
import { render, screen } from '@testing-library/react';
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
          title: 'Title 1',
          status: 'Published 1',
          createdAt: 'today',
        },
        {
          title: 'Title 2',
          status: 'Published 2',
          createdAt: 'today',
        },
      ],
    };

    (useGetArticlesQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    render(<DashboardTable />);
  });
});
