import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { CreateAccount } from '@/components/CreateAccount';
 
global.fetch = jest.fn();
 
describe('CreateAccount Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  it('renders correctly', () => {
    render(<CreateAccount />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('continue-button')).toBeInTheDocument();
  });
 
  it('shows error on invalid email input', async () => {
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByTestId('continue-button'));
 
    await waitFor(() =>
      expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument()
    );
  });
 
  it('shows error if email already in use', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 409,
      json: async () => ({}),
    });
 
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByTestId('continue-button'));
 
    await waitFor(() =>
      expect(screen.getByText('Email is already in use.')).toBeInTheDocument()
    );
  });
 
  it('shows error if code failed to send', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({}),
      }) // /api/check-email
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      }); // /api/send-code
 
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByTestId('continue-button'));
 
    await waitFor(() =>
      expect(screen.getByText('Failed to send verification code.')).toBeInTheDocument()
    );
  });
 
  it('does not show error on successful flow', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({}),
      }) // /api/check-email
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      }); // /api/send-code
 
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByTestId('continue-button'));
 
    await waitFor(() => {
      expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/email is already in use/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/failed to send/i)).not.toBeInTheDocument();
    });
  });
 
  it('shows error on network failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
 
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByTestId('continue-button'));
 
    await waitFor(() =>
      expect(screen.getByText('Something went wrong. Try again.')).toBeInTheDocument()
    );
  });
});
 