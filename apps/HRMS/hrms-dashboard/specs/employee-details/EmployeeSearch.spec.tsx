import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EmployeeSearch } from '../../src/app/employee-details/_components';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/employees'),
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue(''),
    toString: jest.fn().mockReturnValue(''),
  }),
}));

describe('employee search', () => {
  it('1.should employee search component', () => {
    const { container } = render(<EmployeeSearch />);
    expect(container).toBeDefined();
  });
  it('2.should updates employee value', () => {
    const { getByTestId } = render(<EmployeeSearch />);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('searchedValue=bataa'));
    fireEvent.change(getByTestId('employee-search'), { target: { value: 'bataa' } });
  });

  it('3. Should handleChange function called after timeout', () => {
    const { getByTestId } = render(<EmployeeSearch />);

    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('searchedValue=bataa'));
    jest.useFakeTimers();
    fireEvent.change(getByTestId('employee-search'), { target: { value: 'searchedValue=bataa' } });
    jest.runAllTimers();
  });
});
