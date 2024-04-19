import React from 'react';
import { render } from '@testing-library/react';
import { PaginationFooter } from '../../src/app/dashboard/_components/PaginationFooter';
describe('PaginationFooter', () => {
  it('1. Should render', () => {
    const { container } = render(<PaginationFooter />);
    expect(container).toBeDefined();
  });
});
