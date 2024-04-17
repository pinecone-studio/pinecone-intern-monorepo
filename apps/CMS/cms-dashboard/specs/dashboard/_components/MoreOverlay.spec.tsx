import React from 'react';
import { render } from '@testing-library/react';
import MoreOverlay from '../../../src/app/dashboard/_components/MoreOverlay';

describe('DashboardTable', () => {
  it('Should render', () => {
    const { container } = render(<MoreOverlay />);
    expect(container).toBeDefined();
  });
});
