import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { useUpdateNumberUserMutation } from '@/generated';
import UpdateNumber from '@/components/update-user-dialogs/UpdateNumber';

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('@/generated', () => ({
  useUpdateNumberUserMutation: jest.fn(),
}));

describe('UpdateNumber Component', () => {
  const mockUpdateUserNumber = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUser = {
      phoneNumber: '12345678',
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

    useUpdateNumberUserMutation.mockImplementation(() => [mockUpdateUserNumber]);
  });

  it('renders the component with initial phone number', () => {
    render(<UpdateNumber />);
    screen.getByTestId('edit-icon');
  });

  it('opens dialog when edit button is clicked', async () => {
    render(<UpdateNumber />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    screen.getByRole('dialog');

    screen.getByPlaceholderText('0000-0000');
  });

  it('updates phone number when input changes', async () => {
    render(<UpdateNumber />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('0000-0000');
    await userEvent.clear(input);
    await userEvent.type(input, '87654321');
  });

  it('shows error toast when phone number is invalid', async () => {
    render(<UpdateNumber />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('0000-0000');
    await userEvent.clear(input);
    await userEvent.type(input, '1234');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Утасны дугаар 8 оронтой байх ёстой');
    expect(mockUpdateUserNumber).not.toHaveBeenCalled();
  });

  it('handles update error correctly', async () => {
    mockUpdateUserNumber.mockRejectedValueOnce(new Error('Update failed'));

    render(<UpdateNumber />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('0000-0000');
    await userEvent.clear(input);
    await userEvent.type(input, '87654321');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('something went wrong');
    });
  });
  it('successfully updates phone number', async () => {
    const mockUpdatedUser = {
      phoneNumber: '87654321',
      _id: 'test-user-id',
    };

    mockUpdateUserNumber.mockResolvedValueOnce({
      data: {
        updateNumberUser: mockUpdatedUser,
      },
    });

    render(<UpdateNumber />);
    const editButton = screen.getByTestId('edit-icon');
    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText('0000-0000');
    await userEvent.clear(input);
    await userEvent.type(input, '87654321');

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Таний бүртгэл амжилттай шинэчлэгдлээ');
    });
  });
});
