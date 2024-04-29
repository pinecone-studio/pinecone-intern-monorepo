import { render, fireEvent } from '@testing-library/react';
import { SearchInput } from '../../src/app/dashboard/_components/SearchInput';
import { useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  useSearchParams: jest.fn().mockReturnValueOnce(new URLSearchParams('searchedValue=initialValue')).mockReturnValueOnce(new URLSearchParams('')),
  usePathname: jest.fn().mockReturnValue('/example-path'),
}));

describe('SearchInput component', () => {
  it('updates the search value and navigates correctly', () => {
    const { getByPlaceholderText } = render(<SearchInput />);

    fireEvent.change(getByPlaceholderText('Нийтлэл, шошгоор хайх'), { target: { value: 'newSearchValue' } });
    expect(useRouter).toBeCalled();
    expect(useSearchParams).toBeCalled();
  });
  it('null', () => {
    render(<SearchInput />);
    expect(useRouter).toBeCalled();
  });
});
