import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EditPasswordDialog } from '@/features/update-user-profile/EditPasswordDialog';

// Mock the validation schema
jest.mock('next/navigation', () => ({
  passwordSchema: {
    parse: jest.fn((data) => {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (data.newPassword.length < 6) {
        throw new Error('Password too short');
      }
      return data;
    }),
  },
}));

describe('EditPasswordDialog', () => {
  const mockOnUpdate = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and opens dialog', async () => {
    render(<EditPasswordDialog onUpdate={mockOnUpdate} />);

    await user.click(screen.getByTestId('open-password-dialog'));

    expect(screen.getByTestId('password-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('current-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('new-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
  });

  it('successfully updates password', async () => {
    mockOnUpdate.mockResolvedValueOnce(undefined);
    render(<EditPasswordDialog onUpdate={mockOnUpdate} />);

    await user.click(screen.getByTestId('open-password-dialog'));
    await user.type(screen.getByTestId('current-password-input'), 'oldpassword');
    await user.type(screen.getByTestId('new-password-input'), 'newpassword123');
    await user.type(screen.getByTestId('confirm-password-input'), 'newpassword123');
    await user.click(screen.getByTestId('password-submit'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('newpassword123');
    });
  });

  it('shows loading state and disables inputs', async () => {
    render(<EditPasswordDialog onUpdate={mockOnUpdate} isLoading={true} />);

    await user.click(screen.getByTestId('open-password-dialog'));

    expect(screen.getByTestId('current-password-input')).toBeDisabled();
    expect(screen.getByTestId('new-password-input')).toBeDisabled();
    expect(screen.getByTestId('confirm-password-input')).toBeDisabled();
    expect(screen.getByTestId('password-submit')).toBeDisabled();
  });
});
