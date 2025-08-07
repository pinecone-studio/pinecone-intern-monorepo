import { CreatePassword } from '@/components/CreatePassword';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Create Password component', () => {
  it('renders without crashing', () => {
    render(<CreatePassword />);

    expect(screen.getByText('Create password')).toBeInTheDocument();
    expect(screen.getByText('Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('shows messages when password is invalid', async () => {
    render(<CreatePassword />);

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });
    });

    expect(passwordInput.value).toBe('short');
    expect(confirmPasswordInput.value).toBe('short');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
    expect(screen.getByText('Confirm password must be at least 8 characters.')).toBeInTheDocument();
  });

  it('submits the form when passwords are valid', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<CreatePassword />);

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'ValidPassword123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword123' } });
    });

    expect(passwordInput.value).toBe('ValidPassword123');
    expect(confirmPasswordInput.value).toBe('ValidPassword123');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith('working');
  });
});
