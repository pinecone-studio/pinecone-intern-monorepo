import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LoginForm } from '@/components/Login';

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
});
