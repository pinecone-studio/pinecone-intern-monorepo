import { YouAreAllSet } from '@/components/YouAreAllSet';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockOnSuccess = jest.fn();
describe('YouAreAllSet', () => {
  it('renders correctly', () => {
    render(<YouAreAllSet onSuccess={mockOnSuccess} />);
    expect(screen.getByText("You're all set!")).toBeInTheDocument();
    expect(screen.getByText("Your account is all set. You're ready to explore and connect!")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Swiping!/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /check icon/i })).toBeInTheDocument();
  });

  it('calls onSuccess when button is clicked', () => {
    render(<YouAreAllSet onSuccess={mockOnSuccess} />);
    const button = screen.getByRole('button', { name: /Start Swiping!/i });

    button.click();

    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
