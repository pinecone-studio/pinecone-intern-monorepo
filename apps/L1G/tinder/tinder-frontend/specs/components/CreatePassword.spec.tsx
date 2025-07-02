import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreatePassword } from '@/app/(auth)/signup/components/CreatePasswordComponent';
import { vi } from 'zod/dist/types/v4/locales';


describe('CreatePassword form', () => {
  test('renders logo and headings, password inputs', () => {
    render(<CreatePassword/>);
    expect(screen.getByAltText('Tinder logo')).toBeInTheDocument();
    expect(screen.getByText('Create password')).toBeInTheDocument();
    expect(screen.getByText(/Use a minimum of 10 characters/i)).toBeInTheDocument();
  });

  test('shows error message when submitting empty form', async () => {
    render(<CreatePassword />);
    
    const submitButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findAllByText('Password must be at least 6 characters.')).toHaveLength(2);
  });

  test('accepts valid password and triggers submit', async () => {
    console.log = vi.fn();

    render(<CreatePassword />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const repeatPasswordInput = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByRole('button', { name: /continue/i });

    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'mypassword' } });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith({
      password: 'mypassword',
      repeatPassword: 'mypassword',
    });
  });
});