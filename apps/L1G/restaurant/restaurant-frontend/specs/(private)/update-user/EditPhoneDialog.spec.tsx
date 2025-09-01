import { EditPhoneDialog } from '@/features/update-user-profile/EditPhoneDialog';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  phoneSchema: {
    parse: jest.fn((data) => {
      if (!data.phone || data.phone.length < 8) {
        throw new Error('Invalid phone number');
      }
      return data;
    }),
  },
}));

describe('EditPhoneDialog', () => {
  const mockOnUpdate = jest.fn();
  const user = userEvent.setup();
  const defaultPhone = '99887766';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and opens dialog with pre-filled phone', async () => {
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdate} />);

    await user.click(screen.getByTestId('open-phone-dialog'));

    expect(screen.getByTestId('phone-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toHaveValue(defaultPhone);
    expect(screen.getByText('Утас')).toBeInTheDocument();
  });

  it('successfully updates phone number', async () => {
    mockOnUpdate.mockResolvedValueOnce(undefined);
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdate} />);

    await user.click(screen.getByTestId('open-phone-dialog'));
    await user.clear(screen.getByTestId('phone-input'));
    await user.type(screen.getByTestId('phone-input'), '88776655');
    await user.click(screen.getByTestId('phone-submit'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('88776655');
    });
  });

  it('shows loading state and can be closed', async () => {
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdate} isLoading={true} />);

    await user.click(screen.getByTestId('open-phone-dialog'));

    expect(screen.getByTestId('phone-input')).toBeDisabled();
    expect(screen.getByTestId('phone-submit')).toBeDisabled();

    await user.click(screen.getByTestId('close-phone-dialog'));
    expect(screen.queryByTestId('phone-dialog')).not.toBeInTheDocument();
  });
});
