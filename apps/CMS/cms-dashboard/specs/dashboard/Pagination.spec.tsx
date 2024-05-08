import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Pagination } from '../../src/app/dashboard/_components/Pagination';
describe('Pagination component test', () => {
  it('1. Should render pagination component', () => {
    const totalPageQuantity = 10;
    const pageNumber = 3;
    const setPageNumber = jest.fn();
    const { container } = render(<Pagination totalPageQuantity={totalPageQuantity} pageNumber={pageNumber} setPageNumber={setPageNumber} />);
    expect(container).toBeDefined();
  });
  it('2. Should call handlePageChange function', () => {
    const totalPageQuantity = 10;
    const pageNumber = 3;
    const setPageNumber = jest.fn();
    const { container } = render(<Pagination totalPageQuantity={totalPageQuantity} pageNumber={pageNumber} setPageNumber={setPageNumber} />);
    const button = container.getElementsByTagName('a')[0];
    fireEvent.click(button);
  });
});
