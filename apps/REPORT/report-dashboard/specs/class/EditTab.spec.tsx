import React from 'react';
import { render } from '@testing-library/react';
import EditTab from '../../../report-dashboard/src/components/svg/EditTab';

describe('EditTab', () => {
  it('renders without crashing', () => {
    const { container } = render(<EditTab />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).not.toBeNull();
  });
});
