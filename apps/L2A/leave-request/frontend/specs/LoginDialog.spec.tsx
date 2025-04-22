import '@testing-library/jest-dom'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dialog } from '@/app/login/_features/Dialog';

describe('Dialog Component', () => {
  it('renders email input and login button', () => {
    render(<Dialog />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('shows error class on invalid email', async () => {
    render(<Dialog />);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value: 'invalid' } });

    await waitFor(() => {
      expect(emailInput).toHaveClass('border-red-500');
    });
   });
  it('enables login button on valid email', async () => {
    render(<Dialog />);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value:'test@example.com'} });


    await waitFor(() => {
      const loginButton = screen.getByRole('button');
      expect(loginButton).not.toBeDisabled();
    });
  });
  it('disables login button when email is invalid', async () => {
    render(<Dialog />);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });

    await waitFor(() => {
      const loginButton = screen.getByRole('button');
      expect(loginButton).toBeDisabled();
    });
  } );

});
