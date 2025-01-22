import { SearchSheet } from '@/components/search/SearchSheet';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SearchSheet', () => {
  const mockSetSearchOpen = jest.fn();

  it('closes the search sheet when clicking the overlay', () => {
    render(<SearchSheet searchOpen={true} setSearchOpen={mockSetSearchOpen} />);

    fireEvent.click(screen.getByTestId('open-sheet'));

    expect(mockSetSearchOpen).toHaveBeenCalledWith(false);
  });

  it('clicks the close button "x" inside the input', () => {
    render(<SearchSheet searchOpen={true} setSearchOpen={mockSetSearchOpen} />);

    fireEvent.click(screen.getByText('x'));
  });
});
