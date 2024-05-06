import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EmployeePagination } from '../../src/app/employee-details/_components';
describe('EmployeePagination', () => {
  const handleClickMock = jest.fn();

  afterEach(() => {
    handleClickMock.mockClear();
  });

  it('should not call handleClick when page does not change', () => {
    const { container, getByText } = render(<EmployeePagination page={20} handleClick={handleClickMock} />);
    expect(container).toBeDefined();
    fireEvent.click(getByText('1'));
    expect(handleClickMock).toHaveBeenCalledWith(1);
  });

  it('should not call handleClick when page does not change', () => {
    const { getByText } = render(
      <EmployeePagination page={20} handleClick={handleClickMock}  />
    );
    fireEvent.click(getByText('3'));
    expect(handleClickMock).toHaveBeenCalledWith(3);
  });
});
