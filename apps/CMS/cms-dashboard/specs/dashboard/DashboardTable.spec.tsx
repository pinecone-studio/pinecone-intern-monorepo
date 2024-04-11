import React from 'react';
import { render } from '@testing-library/react';
import DashboardTable from '../../src/app/dashboard/_components/DashboardTable';
describe('DashboardTable', () => {
  it('Should render', () => {
    const { container } = render(<DashboardTable />);
    expect(container).toBeDefined();
  });
});
