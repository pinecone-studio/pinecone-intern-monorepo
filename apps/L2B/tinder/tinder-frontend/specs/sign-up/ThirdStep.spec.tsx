import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/sign-up/_components/ThirdStep';

describe('ThirdStep Component', () => {
  const email = 'test@example.com';

  test('renders password and confirm fields with email', () => {
    render(<ThirdStep email={email} />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
  });

  test('shows error when passwords do not match', async () => {
    render(<ThirdStep email={email} />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password987' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(await screen.findByText(/Нууц үг ижил байх ёстой/i)).toBeInTheDocument();
  });

  test('submits form when passwords match', async () => {
    const mockLog = jest.fn();
    jest.spyOn(console, 'log').mockImplementation(mockLog);

    render(<ThirdStep email={email} />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(mockLog).toHaveBeenCalledWith({
        password: 'password123',
        confirm: 'password123',
      });
    });
  });
});
