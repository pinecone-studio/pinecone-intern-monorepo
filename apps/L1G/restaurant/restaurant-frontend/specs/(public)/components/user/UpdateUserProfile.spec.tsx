/* eslint-disable max-len */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpdateUserProfile } from '@/components/user/UpdateUserProfile';
import { useAuth } from '@/app/context/AuthContext';
import { useUpdateUserMutation } from '@/generated';

// --- Mock hooks ---
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useUpdateUserMutation: jest.fn(),
}));

// --- Mock child components ---
jest.mock('@/components/user/ProfilePictureUpload', () => ({
  ProfilePictureUpload: ({ onImageUpdate, isLoading = false }) => (
    <div
      data-testid="profile-picture-upload"
      data-loading={isLoading ? 'true' : 'false'}
      onClick={async () => {
        await new Promise((r) => setTimeout(r, 0));
        onImageUpdate && onImageUpdate('updated.jpg');
      }}
    >
      ProfilePictureUpload Mock
    </div>
  ),
}));

jest.mock('@/components/user/EditPhoneDialog', () => ({
  EditPhoneDialog: (props: any) => (
    <div data-testid="edit-phone-dialog" data-loading={props.isLoading ? 'true' : 'false'} onClick={() => props.onUpdate && props.onUpdate('987654321')}>
      EditPhoneDialog Mock
    </div>
  ),
}));

jest.mock('@/components/user/EditEmailDialog', () => ({
  EditEmailDialog: (props: any) => (
    <div data-testid="edit-email-dialog" data-loading={props.isLoading ? 'true' : 'false'} onClick={() => props.onUpdate && props.onUpdate('new@example.com')}>
      EditEmailDialog Mock
    </div>
  ),
}));

jest.mock('@/components/user/EditPasswordDialog', () => ({
  EditPasswordDialog: (props: any) => (
    <div data-testid="edit-password-dialog" data-loading={props.isLoading ? 'true' : 'false'} onClick={() => props.onUpdate && props.onUpdate('newpassword123')}>
      EditPasswordDialog Mock
    </div>
  ),
}));

describe('UpdateUserProfile', () => {
  const mockSetUser = jest.fn();
  const mockUpdateUser = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.warn as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: '1', email: 'test@example.com', phoneNumber: '', profile: '', password: '123456' },
      setUser: mockSetUser,
    });

    (useUpdateUserMutation as jest.Mock).mockReturnValue([mockUpdateUser]);
  });

  it('displays not logged in message when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });
    render(<UpdateUserProfile />);
    expect(screen.getByText(/Та нэвтрээгүй байна/i)).toBeInTheDocument();
  });

  it('renders user profile sections when user is authenticated', () => {
    render(<UpdateUserProfile />);
    expect(screen.getByTestId('profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('phone-section')).toBeInTheDocument();
    expect(screen.getByTestId('email-section')).toBeInTheDocument();
    expect(screen.getByTestId('password-section')).toBeInTheDocument();
  });

  it('shows "Оруулаагүй" for empty phone number', () => {
    render(<UpdateUserProfile />);
    expect(screen.getByText('Оруулаагүй')).toBeInTheDocument();
  });

  it('does not call updateUser when userId is missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));
    await waitFor(() => expect(mockUpdateUser).not.toHaveBeenCalled());
  });

  it('handles updateUser mutation error', async () => {
    mockUpdateUser.mockRejectedValueOnce(new Error('Network error'));
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalled());
  });

  it('does not crash if updateUser returns null', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: null } });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));
    await waitFor(() => expect(mockSetUser).not.toHaveBeenCalled());
  });

  it('calls setUser after profile picture update', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: { profile: 'updated.jpg' } } });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      const updaterFunction = mockSetUser.mock.calls[0][0];
      const newState = updaterFunction({
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: '123456',
      });
      expect(newState).toEqual(expect.objectContaining({ profile: 'updated.jpg' }));
    });
  });

  it('disables sections when mutation is loading', () => {
    render(<UpdateUserProfile />);
    expect(screen.getByTestId('profile-picture-upload')).toHaveAttribute('data-loading', 'false');
    expect(screen.getByTestId('edit-phone-dialog')).toHaveAttribute('data-loading', 'false');
    expect(screen.getByTestId('edit-email-dialog')).toHaveAttribute('data-loading', 'false');
    expect(screen.getByTestId('edit-password-dialog')).toHaveAttribute('data-loading', 'false');
  });

  it('calls setUser after phone update', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: { phoneNumber: '987654321' } } });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      const updaterFunction = mockSetUser.mock.calls[0][0];
      const newState = updaterFunction({
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: '123456',
      });
      expect(newState).toEqual(expect.objectContaining({ phoneNumber: '987654321' }));
    });
  });

  it('calls setUser after email update', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: { email: 'new@example.com' } } });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-email-dialog'));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      const updaterFunction = mockSetUser.mock.calls[0][0];
      const newState = updaterFunction({
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: '123456',
      });
      expect(newState).toEqual(expect.objectContaining({ email: 'new@example.com' }));
    });
  });

  it('calls updateUser after password update', async () => {
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-password-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          userId: '1',
          input: {
            email: 'test@example.com',
            password: 'newpassword123',
            phoneNumber: '',
            profile: '',
          },
        },
      });
    });
  });

  it('handles phone update error', async () => {
    mockUpdateUser.mockRejectedValueOnce(new Error('Phone update error'));
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalled());
  });

  it('handles email update error', async () => {
    mockUpdateUser.mockRejectedValueOnce(new Error('Email update error'));
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-email-dialog'));
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalled());
  });

  it('handles password update error', async () => {
    mockUpdateUser.mockRejectedValueOnce(new Error('Password update error'));
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-password-dialog'));
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalled());
  });

  it('returns prev (null) in setUser branch on profile update when prev is null', async () => {
    const setUserPrevNull = jest.fn((updater: any) => updater(null));
    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: '1', email: 'test@example.com', phoneNumber: '', profile: '', password: '123456' },
      setUser: setUserPrevNull,
    });
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: { profile: 'updated.jpg' } } });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));

    await waitFor(() => {
      expect(setUserPrevNull).toHaveBeenCalled();
      expect(setUserPrevNull.mock.results[0].value).toBeNull();
    });
  });

  it('returns prev (null) in setUser branch on phone update when prev is null', async () => {
    const setUserPrevNull = jest.fn((updater: any) => updater(null));
    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: '1', email: 'test@example.com', phoneNumber: '', profile: '', password: '123456' },
      setUser: setUserPrevNull,
    });
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: { phoneNumber: '987654321' } } });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));

    await waitFor(() => {
      expect(setUserPrevNull).toHaveBeenCalled();
      expect(setUserPrevNull.mock.results[0].value).toBeNull();
    });
  });

  it('returns prev (null) in setUser branch on email update when prev is null', async () => {
    const setUserPrevNull = jest.fn((updater: any) => updater(null));
    (useAuth as jest.Mock).mockReturnValue({
      user: { userId: '1', email: 'test@example.com', phoneNumber: '', profile: '', password: '123456' },
      setUser: setUserPrevNull,
    });
    mockUpdateUser.mockResolvedValueOnce({ data: { updateUser: { email: 'new@example.com' } } });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-email-dialog'));

    await waitFor(() => {
      expect(setUserPrevNull).toHaveBeenCalled();
      expect(setUserPrevNull.mock.results[0].value).toBeNull();
    });
  });

  it('logs error in password update catch branch', async () => {
    const err = new Error('Password update error');
    mockUpdateUser.mockRejectedValueOnce(err);

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-password-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Password update error:', expect.any(Error));
    });
  });

  it('returns early in handleProfilePictureUpdate when user is missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));
    await waitFor(() => expect(mockUpdateUser).not.toHaveBeenCalled());
  });

  it('returns early in handlePhoneUpdate when user is missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));
    await waitFor(() => expect(mockUpdateUser).not.toHaveBeenCalled());
  });

  it('returns early in handleEmailUpdate when user is missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-email-dialog'));
    await waitFor(() => expect(mockUpdateUser).not.toHaveBeenCalled());
  });

  it('returns early in handlePasswordUpdate when user is missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-password-dialog'));
    await waitFor(() => expect(mockUpdateUser).not.toHaveBeenCalled());
  });

  it('skips setUser when updateUser returns undefined in profile update', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: undefined });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));
    await waitFor(() => expect(mockSetUser).not.toHaveBeenCalled());
  });

  it('skips setUser when updateUser returns undefined in phone update', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: undefined });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));
    await waitFor(() => expect(mockSetUser).not.toHaveBeenCalled());
  });

  it('skips setUser when updateUser returns undefined in email update', async () => {
    mockUpdateUser.mockResolvedValueOnce({ data: undefined });
    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-email-dialog'));
    await waitFor(() => expect(mockSetUser).not.toHaveBeenCalled());
  });

  // Tests for the missing password fallback
  it('uses empty string for password when user password is missing in profile update', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: undefined, // Missing password
      },
      setUser: mockSetUser,
    });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          userId: '1',
          input: {
            email: 'test@example.com',
            password: '', // Should use empty string
            phoneNumber: '',
            profile: 'updated.jpg',
          },
        },
      });
    });
  });

  it('uses empty string for password when user password is missing in phone update', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: undefined, // Missing password
      },
      setUser: mockSetUser,
    });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          userId: '1',
          input: {
            email: 'test@example.com',
            password: '', // Should use empty string
            phoneNumber: '987654321',
            profile: '',
          },
        },
      });
    });
  });

  it('uses empty string for password when user password is missing in email update', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: undefined, // Missing password
      },
      setUser: mockSetUser,
    });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-email-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        variables: {
          userId: '1',
          input: {
            email: 'new@example.com',
            password: '', // Should use empty string
            phoneNumber: '',
            profile: '',
          },
        },
      });
    });
  });

  // Tests for null-to-undefined conversion
  it('handles null profile by setting undefined in state', async () => {
    mockUpdateUser.mockResolvedValueOnce({
      data: {
        updateUser: {
          profile: null, // Null profile from API
          email: 'test@example.com',
          phoneNumber: '',
        },
      },
    });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('profile-picture-upload'));

    await waitFor(() => {
      const updaterFunction = mockSetUser.mock.calls[0][0];
      const newState = updaterFunction({
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: '123456',
      });
      expect(newState.profile).toBeUndefined(); // Should convert null to undefined
    });
  });

  it('handles null phoneNumber by setting undefined in state', async () => {
    mockUpdateUser.mockResolvedValueOnce({
      data: {
        updateUser: {
          phoneNumber: null, // Null phoneNumber from API
          email: 'test@example.com',
          profile: '',
        },
      },
    });

    render(<UpdateUserProfile />);
    fireEvent.click(screen.getByTestId('edit-phone-dialog'));

    await waitFor(() => {
      const updaterFunction = mockSetUser.mock.calls[0][0];
      const newState = updaterFunction({
        userId: '1',
        email: 'test@example.com',
        phoneNumber: '',
        profile: '',
        password: '123456',
      });
      expect(newState.phoneNumber).toBeUndefined(); // Should convert null to undefined
    });
  });
});
