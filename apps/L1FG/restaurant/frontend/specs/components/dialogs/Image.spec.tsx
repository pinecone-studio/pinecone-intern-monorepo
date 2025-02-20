import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { useUpdateUserImageMutation } from '@/generated';
import UpdateImage from '@/components/update-user-dialogs/UpdateImage';

// Mock the hooks and modules
jest.mock('@/generated', () => ({
  useUpdateUserImageMutation: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('UpdateImage', () => {
  const mockUpdateUserImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup localStorage mock
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        _id: 'test-user-id',
        profileImage: 'data:image/png;base64,existingImage',
      })
    );

    // Setup mutation mock
    useUpdateUserImageMutation.mockReturnValue([mockUpdateUserImage]);
  });

  it('successfully updates profile image', async () => {
    const mockUpdatedUser = {
      profileImage: 'data:image/png;base64,newImageData',
      _id: 'test-user-id',
    };

    mockUpdateUserImage.mockResolvedValueOnce({
      data: {
        updateUserImage: mockUpdatedUser,
      },
    });

    const { getByTestId } = render(<UpdateImage />);

    // Open the dialog
    const editButton = getByTestId('edit-icon');

    await userEvent.click(editButton);

    // Upload new image (simulated)
    const fileInput = screen.getByLabelText(/зураг сонгох/i, { selector: 'input' });
    const file = new File(['dummy content'], 'profile.png', { type: 'image/png' });
    await userEvent.upload(fileInput, file);

    // Click update button
    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateUserImage).toHaveBeenCalledWith({
        variables: {
          input: {
            profileImage: expect.any(String),
            _id: 'test-user-id',
          },
        },
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUpdatedUser));

      expect(toast.success).toHaveBeenCalledWith('Таний бүртгэл амжилттай шинэчлэгдлээ');
    });
  });

  it('shows error toast when update fails', async () => {
    mockUpdateUserImage.mockRejectedValueOnce(new Error('Update failed'));

    const { getByTestId } = render(<UpdateImage />);
    const editButton = getByTestId('edit-icon');

    await userEvent.click(editButton);

    // Upload image and submit
    const fileInput = screen.getByLabelText(/зураг сонгох/i, { selector: 'input' });
    const file = new File(['dummy content'], 'profile.png', { type: 'image/png' });
    await userEvent.upload(fileInput, file);

    const submitButton = screen.getByText('Шинэчлэх');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('something went wrong');
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });
  });
  it('returns early when file is null', async () => {
    // Create a spy for FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onloadend: jest.fn(),
    };
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader);

    const { getByTestId } = render(<UpdateImage />);

    // Open the dialog
    const editButton = getByTestId('edit-icon');

    await userEvent.click(editButton);

    // Get file input
    const fileInput = screen.getByLabelText(/зураг сонгох/i, { selector: 'input' });

    // Trigger change event with null file
    const nullChangeEvent = { target: { files: null } };
    fireEvent.change(fileInput, nullChangeEvent);

    // Verify FileReader wasn't called
    expect(mockFileReader.readAsDataURL).not.toHaveBeenCalled();
  });
});
