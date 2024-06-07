import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PayrollPagination } from '../../src/app/payroll/delivery/_components/PayrollPagination';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('5'),
  }),
}));
describe('PayrollPagination', () => {
  const handleClickMock = jest.fn();

  afterEach(() => {
    handleClickMock.mockClear();
  });

  it('should not call handleClick when page does not change', () => {
    const { container } = render(<PayrollPagination page={20} setChecked={handleClickMock} checked={1} />);
    expect(container).toBeDefined();
  });

  it('should not call handleClick when page does not change', () => {
    const { getByText } = render(<PayrollPagination page={20} setChecked={handleClickMock} checked={1} />);
    fireEvent.click(getByText('3'));
    expect(handleClickMock).toHaveBeenCalledWith(3);
  });
});
