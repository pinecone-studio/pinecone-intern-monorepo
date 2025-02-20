import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { useUpdatePasswordUserMutation } from '@/generated';
import UpdatePassword from '@/components/update-user-dialogs/UpdatePassword';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('@/generated', () => ({
  useUpdatePasswordUserMutation: jest.fn(),
}));

describe('UpdatePassword Component', () => {
  const mockUpdateUserPassword = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Mock localStorage
    const mockUser = {
      _id: 'test-user-id',
    };

    global.localStorage = {
      getItem: jest.fn(() => JSON.stringify(mockUser)),
      setItem: jest.fn(),
    };

    // Mock the mutation hook
    useUpdatePasswordUserMutation.mockImplementation(() => [mockUpdateUserPassword]);
  });

  it('renders the component with initial empty password fields', () => {
    render(<UpdatePassword />);
    screen.getByTestId('edit-icon');
  });

  it('opens dialog when edit button is clicked', async () => {
    render(<UpdatePassword />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    screen.getByRole('dialog');

    screen.getByPlaceholderText('Хуучин нууц үг');
    screen.getByPlaceholderText('Шинэ нууц үг');
    screen.getByPlaceholderText('Шинэ нууц үг давтах');
  });

  it('updates password fields when input changes', async () => {
    render(<UpdatePassword />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const oldPasswordInput = screen.getByPlaceholderText('Хуучин нууц үг');
    const newPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг');
    const confirmPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг давтах');

    await userEvent.type(oldPasswordInput, 'oldpass123');
    await userEvent.type(newPasswordInput, 'newpass123');
    await userEvent.type(confirmPasswordInput, 'newpass123');
  });

  it('shows error when new passwords do not match', async () => {
    render(<UpdatePassword />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const oldPasswordInput = screen.getByPlaceholderText('Хуучин нууц үг');
    const newPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг');
    const confirmPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг давтах');

    await userEvent.type(oldPasswordInput, 'oldpass123');
    await userEvent.type(newPasswordInput, 'newpass123');
    await userEvent.type(confirmPasswordInput, 'newpass124');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Нууц үг таарахгүй байна.');
    expect(mockUpdateUserPassword).not.toHaveBeenCalled();
  });

  it('successfully updates password when all inputs are valid', async () => {
    mockUpdateUserPassword.mockResolvedValueOnce({ data: { updatePasswordUser: true } });

    render(<UpdatePassword />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const oldPasswordInput = screen.getByPlaceholderText('Хуучин нууц үг');
    const newPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг');
    const confirmPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг давтах');

    await userEvent.type(oldPasswordInput, 'oldpass123');
    await userEvent.type(newPasswordInput, 'newpass123');
    await userEvent.type(confirmPasswordInput, 'newpass123');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Таний бүртгэл амжилттай шинэчлэгдлээ');
    });
  });

  it('handles incorrect old password error', async () => {
    mockUpdateUserPassword.mockRejectedValueOnce(new Error('Invalid old password'));

    render(<UpdatePassword />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const oldPasswordInput = screen.getByPlaceholderText('Хуучин нууц үг');
    const newPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг');
    const confirmPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг давтах');

    await userEvent.type(oldPasswordInput, 'wrongpass');
    await userEvent.type(newPasswordInput, 'newpass123');
    await userEvent.type(confirmPasswordInput, 'newpass123');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Хуучин нууц үг таарахгүй байна!');
    });
  });

  it('dialog closes after successful password update', async () => {
    mockUpdateUserPassword.mockResolvedValueOnce({ data: { updatePasswordUser: true } });

    render(<UpdatePassword />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const oldPasswordInput = screen.getByPlaceholderText('Хуучин нууц үг');
    const newPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг');
    const confirmPasswordInput = screen.getByPlaceholderText('Шинэ нууц үг давтах');

    await userEvent.type(oldPasswordInput, 'oldpass123');
    await userEvent.type(newPasswordInput, 'newpass123');
    await userEvent.type(confirmPasswordInput, 'newpass123');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);
  });
});
