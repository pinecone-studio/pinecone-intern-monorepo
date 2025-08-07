import { YouAreAllSet } from '@/components/YouAreAllSet';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('YouAreAllSet', () => {
  it('renders correctly', () => {
    render(<YouAreAllSet />);
    expect(screen.getByText("You're all set!")).toBeInTheDocument();
    expect(screen.getByText("Your account is all set. You're ready to explore and connect!")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Swiping!/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /check icon/i })).toBeInTheDocument();
  });
});
