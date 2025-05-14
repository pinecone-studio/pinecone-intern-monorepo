import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/sign-up/_components/ThirdStep';

describe('ThirdStep Component', () => {
  test('shows error when passwords do not match', async () => {
    render(<ThirdStep email="test@example.com" />);

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'Password123!' },
    });

    fireEvent.change(screen.getByTestId('confirm-password-input'), {
      target: { value: 'WrongPass123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(await screen.findByText(/Password do not match/i)).toBeInTheDocument();
  });

  test('submits form when passwords match', async () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    render(<ThirdStep email="test@example.com" />);

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'Password123!' },
    });

    fireEvent.change(screen.getByTestId('confirm-password-input'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(mockLog).toHaveBeenCalledWith({
        password: 'Password123!',
        confirm: 'Password123!',
        email: 'test@example.com',
      });
    });

    mockLog.mockRestore();
  });
});
