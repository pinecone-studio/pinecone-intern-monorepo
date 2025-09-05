import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EditPhoneDialog } from '@/components/user/EditPhoneDialog';

jest.mock('next/navigation', () => ({
  phoneSchema: {
    parse: jest.fn((data) => {
      if (!data.phone || data.phone.length < 8) throw new Error('Invalid phone number');
      return data;
    }),
  },
}));

describe('EditPhoneDialog', () => {
  const defaultPhone = '99887766';
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and opens dialog with pre-filled phone', async () => {
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdate} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-phone-dialog'));

    expect(screen.getByTestId('phone-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toHaveValue(defaultPhone);
    expect(screen.getByText('Утас')).toBeInTheDocument();
  });

  it('successfully updates phone number', async () => {
    mockOnUpdate.mockResolvedValueOnce(undefined);
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdate} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-phone-dialog'));
    await user.clear(screen.getByTestId('phone-input'));
    await user.type(screen.getByTestId('phone-input'), '88776655');
    await user.click(screen.getByTestId('phone-submit'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('88776655');
    });
  });

  it('shows loading state and disables inputs', async () => {
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdate} isLoading={true} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-phone-dialog'));

    expect(screen.getByTestId('phone-input')).toBeDisabled();
    expect(screen.getByTestId('phone-submit')).toBeDisabled();
  });

  it('shows updating state while submitting', async () => {
    const mockOnUpdatePending = jest.fn(() => new Promise(() => {})); // never resolves
    render(<EditPhoneDialog phone={defaultPhone} onUpdate={mockOnUpdatePending} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('open-phone-dialog'));
    await user.clear(screen.getByTestId('phone-input'));
    await user.type(screen.getByTestId('phone-input'), '88776655');
    await user.click(screen.getByTestId('phone-submit'));

    expect(await screen.findByText('Шинэчилж байна...')).toBeInTheDocument();
    expect(screen.getByTestId('phone-submit')).toBeDisabled();
  });
});
