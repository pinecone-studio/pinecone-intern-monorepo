import { EditEmailDialog } from '@/features/update-user-profile/EditEmailDialog';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  emailSchema: {
    parse: jest.fn((data) => {
      if (!data.email || !data.email.includes('@')) {
        throw new Error('Invalid email');
      }
      return data;
    }),
  },
}));

describe('EditEmailDialog', () => {
  const mockOnUpdate = jest.fn();
  const user = userEvent.setup();
  const defaultEmail = 'test@example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and opens dialog with pre-filled email', async () => {
    render(<EditEmailDialog currentEmail={defaultEmail} onUpdate={mockOnUpdate} />);

    await user.click(screen.getByTestId('open-email-dialog'));

    expect(screen.getByTestId('email-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toHaveValue(defaultEmail);
    expect(screen.getByText('Имэйл хаяг')).toBeInTheDocument();
  });

  it('successfully updates email address', async () => {
    mockOnUpdate.mockResolvedValueOnce(undefined);
    render(<EditEmailDialog currentEmail={defaultEmail} onUpdate={mockOnUpdate} />);

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

    await user.click(screen.getByTestId('open-email-dialog'));

    expect(screen.getByTestId('email-input')).toBeDisabled();
    expect(screen.getByTestId('email-submit')).toBeDisabled();

    await user.click(screen.getByTestId('close-email-dialog'));
    expect(screen.queryByTestId('email-dialog')).not.toBeInTheDocument();
  });
});
