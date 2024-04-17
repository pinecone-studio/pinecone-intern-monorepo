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
  });

  it('3. DashboardTable close morevert button', async () => {
    const { container } = render(<DashboardTable />);

    const moreVertButton = container.getElementsByTagName('button')[0];

    await act(() => {
      fireEvent.click(moreVertButton);
    });

    // const closeButton = container.getElementsByTagName('button')[0].getElementsByTagName('div')[0];
    const closeButton = container.getElementsByTagName('button')[0].getElementsByTagName('div')[0];
    console.log(closeButton);

    await act(() => {
      fireEvent.click(closeButton);
    });
  });
});
