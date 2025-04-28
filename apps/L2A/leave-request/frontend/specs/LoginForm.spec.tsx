import '@testing-library/jest-dom'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/app/login/_features/LoginForm';

describe('Dialog Component', () => {
  it('1. Should render email input and login button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('2. Should show error class on invalid email', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value: 'invalid' } });

    await waitFor(() => {
      expect(emailInput).toHaveClass('border-red-500');
    });
   });
  it('3. Should enable login button on valid email', async () => {
    render(<LoginForm/>);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value:'test@example.com'} });


    await waitFor(() => {
      const loginButton = screen.getByRole('button');
      expect(loginButton).not.toBeDisabled();
    });
  });
  it('4. Should disable login button when email is invalid', async () => {
    render(<LoginForm/>);
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });

    await waitFor(() => {
      const loginButton = screen.getByRole('button');
      expect(loginButton).toBeDisabled();
    });
  } );

});
