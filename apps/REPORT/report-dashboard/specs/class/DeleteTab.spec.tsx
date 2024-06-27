import React from 'react';
import { render } from '@testing-library/react';
import DeleteTab from '../../../report-dashboard/src/components/svg/DeleteTab';

describe('DeleteTab', () => {
  it('renders without crashing', () => {
    const { container } = render(<DeleteTab />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).not.toBeNull();
  });
});
