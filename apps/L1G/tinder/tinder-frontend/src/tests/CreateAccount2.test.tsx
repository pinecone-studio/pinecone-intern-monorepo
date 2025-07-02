// src/__tests__/CreateAccount2.test.tsx
import { render, screen, fireEvent } from '@/providers/test-utils';
import { CreateAccount2 } from '@/components/CreateAccount2';
import '@testing-library/jest-dom';

describe('CreateAccount2', () => {
  it('renders the heading', () => {
    render(<CreateAccount2 />);
    expect(screen.getByText(/Who are you interested in/i)).toBeInTheDocument();
  });

  it('disables Next button initially', () => {
    render(<CreateAccount2 />);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('enables Next button when an option is selected', () => {
    render(<CreateAccount2 />);
    fireEvent.mouseDown(screen.getByText('Select'));
    fireEvent.click(screen.getByText('Male'));
    expect(screen.getByRole('button', { name: /Next/i })).toBeEnabled();
  });
});
