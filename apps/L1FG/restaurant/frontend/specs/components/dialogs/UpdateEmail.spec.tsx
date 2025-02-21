import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { useUpdateEmailUserMutation } from '@/generated';
import UpdateEmail from '@/components/update-user-dialogs/UpdateEmail';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('@/generated', () => ({
  useUpdateEmailUserMutation: jest.fn(),
}));

describe('UpdateEmail Component', () => {
  const mockUpdateUserEmail = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Mock localStorage
    const mockUser = {
      email: 'test@example.com',
      _id: 'test-user-id',
    };

    global.localStorage = {
      getItem: jest.fn(() => JSON.stringify(mockUser)),
      setItem: jest.fn(),
      length: 1,
      clear: jest.fn(),
      key: jest.fn(),
      removeItem: jest.fn(),
    };

    // Mock the mutation hook
    useUpdateEmailUserMutation.mockImplementation(() => [mockUpdateUserEmail]);
  });

  it('renders the component with initial email', () => {
    render(<UpdateEmail />);
    screen.getByTestId('edit-icon');
  });

  it('opens dialog when edit button is clicked', async () => {
    render(<UpdateEmail />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    screen.getByRole('dialog');

    screen.getByPlaceholderText('Шинэчлэх хаяг');
  });

  it('updates email when input changes', async () => {
    render(<UpdateEmail />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('Шинэчлэх хаяг');
    await userEvent.clear(input);
    await userEvent.type(input, 'new@example.com');
  });

  it('shows error toast when email format is invalid', async () => {
    render(<UpdateEmail />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('Шинэчлэх хаяг');
    await userEvent.clear(input);
    await userEvent.type(input, 'invalid-email');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Зөв имэйл хаяг оруулна уу.');
    expect(mockUpdateUserEmail).not.toHaveBeenCalled();
  });

  it('successfully updates email', async () => {
    const mockUpdatedUser = {
      email: 'new@example.com',
      _id: 'test-user-id',
    };

    mockUpdateUserEmail.mockResolvedValueOnce({
      data: {
        updateEmailUser: mockUpdatedUser,
      },
    });

    render(<UpdateEmail />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('Шинэчлэх хаяг');
    await userEvent.clear(input);
    await userEvent.type(input, 'new@example.com');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Таний бүртгэл амжилттай шинэчлэгдлээ');
    });
  });

  it('handles update error correctly', async () => {
    mockUpdateUserEmail.mockRejectedValueOnce(new Error('Update failed'));

    render(<UpdateEmail />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('Шинэчлэх хаяг');
    await userEvent.clear(input);
    await userEvent.type(input, 'new@example.com');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('something went wrong');
    });
  });

  it('validates different email formats', async () => {
    render(<UpdateEmail />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('Шинэчлэх хаяг');
    const submitButton = screen.getByText('Шинэчлэх');

    // Test invalid email formats
    const invalidEmails = ['test', 'test@', 'test@.com', '@example.com', 'test@example.'];
    for (const email of invalidEmails) {
      await userEvent.clear(input);
      await userEvent.type(input, email);
      await userEvent.click(submitButton);
      expect(toast.error).toHaveBeenCalledWith('Зөв имэйл хаяг оруулна уу.');
      jest.clearAllMocks();
    }
  });
});
