import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchIcon from '@/app/_assets/SearchIcon';

describe('SearchIcon', () => {
  it('renders the SearchIcon element', () => {
    render(<SearchIcon />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
  });

  it('applies custom props', () => {
    render(<SearchIcon className="custom-class" />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
  });
});
