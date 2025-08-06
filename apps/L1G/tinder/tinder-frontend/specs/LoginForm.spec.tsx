import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LoginForm } from '@/components/Login';
import '@testing-library/jest-dom';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Login form ', () => {
  it('renders without crash', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<LoginForm />);

    const email = screen.getByPlaceholderText('name@example.com') as HTMLInputElement;
    const password = screen.getByPlaceholderText('Please enter your password') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    act(() => {
      fireEvent.change(email, { target: { value: 'test@example.com' } });
      fireEvent.change(password, { target: { value: 'password123' } });
    });

    expect(email.value).toBe('test@example.com');
    expect(password.value).toBe('password123');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('working');
    });
  });

  it('shows validation errors for null input', async () => {
    render(<LoginForm />);

    const email = screen.getByPlaceholderText('name@example.com') as HTMLInputElement;
    const password = screen.getByPlaceholderText('Please enter your password') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<LoginForm />);

    const email = screen.getByPlaceholderText('name@example.com') as HTMLInputElement;
    const password = screen.getByPlaceholderText('Please enter your password') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(email, { target: { value: 'test' } });
      fireEvent.change(password, { target: { value: 'pass' } });
      fireEvent.click(submitBtn);
    });

    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('navigates to forgot password page on click', async () => {
    render(<LoginForm />);

    const forgotPasswordButton = screen.getByText(/Forgot Password\?/i);

    await act(async () => {
      fireEvent.click(forgotPasswordButton);
    });

    expect(mockPush).toHaveBeenCalledWith('/login/forgot-password');
  });
});
