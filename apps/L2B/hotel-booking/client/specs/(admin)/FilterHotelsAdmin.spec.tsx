'use client';

import FilterHotelsAdmin from '@/app/(admin)/hotels/_components/FilterHotelsAdmin';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import * as ReactDOM from 'react-dom';

jest.spyOn(ReactDOM, 'createPortal').mockImplementation((element: React.ReactNode) => element as ReturnType<typeof ReactDOM.createPortal>);
describe('FilterHotelsAdmin', () => {
  it('renders all SelectFilter components and the input', () => {
    render(<FilterHotelsAdmin />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('allows typing into the search input', () => {
    render(<FilterHotelsAdmin />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Grand Hotel' } });
    expect(input.value).toBe('Grand Hotel');
  });
});
