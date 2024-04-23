import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DashboardTable from '../../src/app/dashboard/_components/DashboardTable';
import { useGetArticlesQueryQuery } from '../../src/generated/';

jest.mock('../../src/generated/', () => ({
  useGetArticlesQueryQuery: jest.fn(),
}));

describe('Dashboard Table', () => {
  beforeEach(() => {
    (useGetArticlesQueryQuery as jest.Mock).mockReturnValue({
      data: {
        getArticlesQuery: [
          {
            title: 'Title 1',
            status: 'Published 1',
            createdAt: 'today',
            category: { name: 'category 1' },
          },
        ],
      },
    });
  });

  it('renders table headers correctly', () => {
    render(<DashboardTable />);
  });

  it('opens menu on morevert button click', () => {
    render(<DashboardTable />);

    const moreVertButton = screen.getByTestId('morevert-button-test-id');

    act(() => {
      fireEvent.click(moreVertButton);
    });
  });

  it('close on morevert button click', async () => {
    const { container, getAllByTestId } = render(<DashboardTable />);

    const moreVertButtonn = container.getElementsByTagName('button')[0];

    await act(() => {
      fireEvent.click(moreVertButtonn);
    });

    const menuItem = getAllByTestId('close-button-menu-test-id')[0];

    await act(async () => {
      await fireEvent.click(menuItem);
    });
  });
});
