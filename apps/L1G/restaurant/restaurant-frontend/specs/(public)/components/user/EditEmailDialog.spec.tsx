import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EditEmailDialog } from '@/components/user/EditEmailDialog';

describe('EditEmailDialog', () => {
  const defaultEmail = 'test@example.com';
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and opens dialog with pre-filled email', async () => {
    render(<EditEmailDialog currentEmail={defaultEmail} onUpdate={mockOnUpdate} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-email-dialog'));

    expect(await screen.findByTestId('email-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toHaveValue(defaultEmail);
    expect(screen.getByText('Имэйл хаяг')).toBeInTheDocument();
  });

  it('successfully updates email address', async () => {
    mockOnUpdate.mockResolvedValueOnce(undefined);
    render(<EditEmailDialog currentEmail={defaultEmail} onUpdate={mockOnUpdate} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-email-dialog'));
    await user.clear(screen.getByTestId('email-input'));
    await user.type(screen.getByTestId('email-input'), 'newemail@example.com');
    await user.click(screen.getByTestId('email-submit'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('newemail@example.com');
    });
  });

  it('shows loading state and can be closed', async () => {
    render(<EditEmailDialog currentEmail={defaultEmail} onUpdate={mockOnUpdate} isLoading={true} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-email-dialog'));

    expect(screen.getByTestId('email-input')).toBeDisabled();
    expect(screen.getByTestId('email-submit')).toBeDisabled();

    await user.click(screen.getByTestId('close-email-dialog'));

    await waitFor(() => {
      expect(screen.queryByTestId('email-dialog')).not.toBeInTheDocument();
    });
  });

  it('shows updating state while submitting', async () => {
    const mockOnUpdate = jest.fn(() => new Promise(() => {})); // never resolves
    render(<EditEmailDialog currentEmail="test@example.com" onUpdate={mockOnUpdate} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-email-dialog'));
    await user.clear(screen.getByTestId('email-input'));
    await user.type(screen.getByTestId('email-input'), 'loading@example.com');
    await user.click(screen.getByTestId('email-submit'));

    // Immediately after submit, updating = true
    expect(await screen.findByText('Шинэчилж байна...')).toBeInTheDocument();
    expect(screen.getByTestId('email-submit')).toBeDisabled();
  });
});
