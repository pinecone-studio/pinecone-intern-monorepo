import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import DashboardTable from '../../src/app/dashboard/_components/DashboardTable';

describe('DashboardTable', () => {
  it('1. Should render dashboard table', () => {
    const { container } = render(<DashboardTable />);
    expect(container).toBeDefined();
  });

  it('2. DashboardTable morevert click button', async () => {
    const { container } = render(<DashboardTable />);

    const moreVertButton = container.getElementsByTagName('button')[0];

    await act(() => {
      fireEvent.click(moreVertButton);
    });

    expect(container.getElementsByTagName('div')[0]).toBeDefined();

    await act(() => {
      fireEvent.click(moreVertButton);
    });
  });

  it('3. DashboardTable close morevert button', async () => {
    const { container, getAllByTestId } = render(<DashboardTable />);

    const moreVertButton = container.getElementsByTagName('button')[0];

    await act(async () => {
      await fireEvent.click(moreVertButton);
    });

    const menuItem = getAllByTestId('close-button-menu-test-id')[0];
    const menuIcon = getAllByTestId('item-icon')[0];
    const test = getAllByTestId('drop-down-menu-test-id')[0];
    console.log(test);
    expect(menuItem).toBeTruthy();
    expect(menuIcon).toBeTruthy();

    await act(async () => {
      await fireEvent.click(menuItem);
    });
  });
});
