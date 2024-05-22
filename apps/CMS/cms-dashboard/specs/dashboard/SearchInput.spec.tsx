import { render, fireEvent } from '@testing-library/react';
import { SearchInput } from '../../src/app/dashboard/_components/SearchInput';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  useSearchParams: jest.fn().mockReturnValue({ get: jest.fn().mockResolvedValueOnce('') }),
  usePathname: jest.fn().mockReturnValue('/example-path'),
}));

describe('SearchInput component', () => {
  it('1. Should updates searched value', () => {
    const { getByTestId } = render(<SearchInput />);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('searchedValue=initialValue'));
    fireEvent.change(getByTestId('search-input-test-id'), { target: { value: 'initialValue' } });
  });
  it('2. SearchedValue null check ', () => {
    render(<SearchInput />);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
  });

  it('3. Should handleChange function called after timeout', () => {
    const { getByTestId } = render(<SearchInput />);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('searchedValue=newValue'));
    jest.useFakeTimers();
    fireEvent.change(getByTestId('search-input-test-id'), { target: { value: 'searchedValue=newValue' } });
    jest.runAllTimers();
  });
  it('4. Should handleClear function called', () => {
    const { getByTestId } = render(<SearchInput />);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('searchedValue=newValue'));
    fireEvent.click(getByTestId('clear-filter-button-test-id'));
  });
});
