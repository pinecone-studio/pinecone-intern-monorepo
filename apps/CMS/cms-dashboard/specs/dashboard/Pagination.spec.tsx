import React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from '../../src/app/dashboard/_components/Pagination';
describe('Pagination component test', () => {
  it('1. Should render pagination component', () => {
    const { container } = render(<Pagination />);
    expect(container).toBeDefined();
  });
});
