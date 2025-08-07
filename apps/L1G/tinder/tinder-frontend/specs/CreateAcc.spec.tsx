import { CreateAccount } from '@/components/CreateAcc';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('CreateAcc Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crash', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<CreateAccount />);

    const email = screen.getByPlaceholderText('name@example.com') as HTMLInputElement;
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    act(() => {
      fireEvent.change(email, { target: { value: 'test@example.com' } });
    });

    expect(email.value).toBe('test@example.com');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('working');
    });
  });

  it('shows error when invalid email is submitted', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<CreateAccount />);
    const emailInput = screen.getByPlaceholderText('name@example.com');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /Continue/i }));
    });
    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument();

    expect(consoleSpy).not.toHaveBeenCalledWith('working');
  });
});
