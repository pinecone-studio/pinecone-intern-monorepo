'use client';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
// Mock GraphQL mutation
jest.mock('@/generated', () => ({
  useUpdateUserMutation: jest.fn(),
}));

// Mock Auth context
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock child components
jest.mock('@/features/update-user-profile/ProfilePictureUpload', () => ({
  ProfilePictureUpload: ({ onImageUpdate }: any) => (
    <button onClick={() => onImageUpdate('new-image-url')} data-testid="upload-image">
      Upload Image
    </button>
  ),
}));

jest.mock('@/features/update-user-profile/EditPhoneDialog', () => ({
  EditPhoneDialog: ({ onUpdate }: any) => (
    <button onClick={() => onUpdate('99887766')} data-testid="edit-phone">
      Edit Phone
    </button>
  ),
}));

jest.mock('@/features/update-user-profile/EditEmailDialog', () => ({
  EditEmailDialog: ({ onUpdate }: any) => (
    <button onClick={() => onUpdate('new@example.com')} data-testid="edit-email">
      Edit Email
    </button>
  ),
}));

jest.mock('@/features/update-user-profile/EditPasswordDialog', () => ({
  EditPasswordDialog: ({ onUpdate }: any) => (
    <button onClick={() => onUpdate('newpassword')} data-testid="edit-password">
      Edit Password
    </button>
  ),
}));

import { useUpdateUserMutation } from '@/generated';
import { useAuth } from '@/app/context/AuthContext';
import { UpdateUserProfile } from '@/features/update-user-profile/UpdateUserProfile';

describe('UpdateUserProfile', () => {
  const mockUpdateUser = jest.fn();
  const mockSetUser = jest.fn();
  const user = userEvent.setup();

  const mockUser = {
    userId: '123',
    email: 'test@example.com',
    phoneNumber: '99887766',
    profile: 'https://example.com/avatar.jpg',
    password: 'hashedpassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUpdateUserMutation as jest.Mock).mockReturnValue([mockUpdateUser]);
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
    });
  });

  it('renders user profile with correct information', () => {
    render(<UpdateUserProfile />);

    expect(screen.getByText('Хэрэглэгчийн хэсэг')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('99887766')).toBeInTheDocument();
    expect(screen.getByText('••••••••••')).toBeInTheDocument();
  });

  it('shows login message when user not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });

    render(<UpdateUserProfile />);

    expect(screen.getByText('Та нэвтрээгүй байна. Мэдээлэл засахын тулд нэвтэрнэ үү.')).toBeInTheDocument();
  });

  it('successfully updates user profile data', async () => {
    mockUpdateUser.mockResolvedValueOnce({
      data: { updateUser: { email: 'new@example.com' } },
    });

    render(<UpdateUserProfile />);

    await user.click(screen.getByTestId('edit-email'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          userId: '123',
          input: {
            email: 'new@example.com',
            password: 'hashedpassword',
            phoneNumber: '99887766',
            profile: 'https://example.com/avatar.jpg',
          },
        },
      });
      expect(mockSetUser).toHaveBeenCalled();
    });
  });

  it('handles update errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockUpdateUser.mockRejectedValueOnce(new Error('Update failed'));

    render(<UpdateUserProfile />);
    await user.click(screen.getByTestId('edit-email'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Email update error:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
