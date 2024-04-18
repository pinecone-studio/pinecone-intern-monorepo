import React from 'react';
import { render } from '@testing-library/react';
import { JobDash } from '../../src/app/recruiting/_components';

describe('Recruit Component', () => {
  it('should render recruit components', () => {
    const { container } = render(<JobDash />);
    expect(container).toBeDefined();
  });
});
