import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Fifth from '@/app/auth/create-account/_components/FifthStep';

describe('Fifth component', () => {
  it('renders the icon', () => {
    render(<Fifth />);
    const icon = screen.getByTestId('lucide-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the heading text', () => {
    render(<Fifth />);
    const heading = screen.getByText("You`'`re all set!");
    expect(heading).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<Fifth />);
    const paragraph = screen.getByText(/Your account is all set/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('renders the button with correct text', () => {
    render(<Fifth />);
    const button = screen.getByRole('button', { name: /Start Swipping!/i });
    expect(button).toBeInTheDocument();
  });
});
