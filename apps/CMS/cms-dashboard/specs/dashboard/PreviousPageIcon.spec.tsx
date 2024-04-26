import React from 'react';
import { render } from '@testing-library/react';
import { PreviousPageIcon } from '../../src/app/dashboard/_components/PreviousPageIcon';
describe('PreviousPageIcon', () => {
  it('1. Should render', () => {
    const { container } = render(<PreviousPageIcon />);
    expect(container).toBeDefined();
  });
});
