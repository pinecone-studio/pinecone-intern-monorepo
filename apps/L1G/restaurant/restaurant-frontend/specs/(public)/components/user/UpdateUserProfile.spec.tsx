/* eslint-disable */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable complexity */
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

// --- Mock sub components (тасалбар дахь prop нэршилд нийцүүлсэн) ---
jest.mock('@/components/user/ProfilePictureUpload', () => ({
  ProfilePictureUpload: ({ onImageUpdate }: any) => (
    <button onClick={() => onImageUpdate('new-profile.jpg')} data-testid="mock-profile-upload">
      Upload Profile
    </button>
  ),
}));

jest.mock('@/components/user/EditPhoneDialog', () => ({
  EditPhoneDialog: ({ onUpdate }: any) => (
    <button onClick={() => onUpdate('99999999')} data-testid="mock-phone-dialog">
      Edit Phone
    </button>
  ),
}));

jest.mock('@/components/user/EditEmailDialog', () => ({
  EditEmailDialog: ({ onUpdate }: any) => (
    <button onClick={() => onUpdate('new@example.com')} data-testid="mock-email-dialog">
      Edit Email
    </button>
  ),
}));

jest.mock('@/components/user/EditPasswordDialog', () => ({
  EditPasswordDialog: ({ onUpdate }: any) => (
    <button onClick={() => onUpdate('new-password')} data-testid="mock-password-dialog">
      Edit Password
    </button>
  ),
}));

describe('UpdateUserProfile', () => {
  const mockSetUser = jest.fn();
  const mockUpdateUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUpdateUserMutation as jest.Mock).mockReturnValue([mockUpdateUser]);
  });

  it('renders login warning if no user', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, setUser: mockSetUser });

    render(<UpdateUserProfile />);

    expect(screen.getByText(/Та нэвтрээгүй байна/i)).toBeInTheDocument();
  });

  it('renders sections when user is logged in', () => {
    const mockUser = {
      userId: 'u1',
      email: 'test@example.com',
      phoneNumber: '12345678',
      profile: 'profile.jpg',
      password: 'secret',
    };

    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, setUser: mockSetUser });

    render(<UpdateUserProfile />);

    expect(screen.getByTestId('profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('phone-section')).toBeInTheDocument();
    expect(screen.getByTestId('email-section')).toBeInTheDocument();
    expect(screen.getByTestId('password-section')).toBeInTheDocument();
  });

  it('updates profile picture', async () => {
    const mockUser = { userId: 'u1', email: 'e', phoneNumber: 'p', profile: 'old.jpg', password: 'pw' };
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, setUser: mockSetUser });
    mockUpdateUser.mockResolvedValue({ data: { updateUser: { profile: 'new-profile.jpg' } } });

    render(<UpdateUserProfile />);

    fireEvent.click(screen.getByTestId('mock-profile-upload'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('updates phone number', async () => {
    const mockUser = { userId: 'u1', email: 'e', phoneNumber: 'old', profile: 'p.jpg', password: 'pw' };
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, setUser: mockSetUser });
    mockUpdateUser.mockResolvedValue({ data: { updateUser: { phoneNumber: '99999999' } } });

    render(<UpdateUserProfile />);

    fireEvent.click(screen.getByTestId('mock-phone-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('updates email', async () => {
    const mockUser = { userId: 'u1', email: 'old@example.com', phoneNumber: '1234', profile: 'p.jpg', password: 'pw' };
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, setUser: mockSetUser });
    mockUpdateUser.mockResolvedValue({ data: { updateUser: { email: 'new@example.com' } } });

    render(<UpdateUserProfile />);

    fireEvent.click(screen.getByTestId('mock-email-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('updates password', async () => {
    const mockUser = { userId: 'u1', email: 'e', phoneNumber: '1234', profile: 'p.jpg', password: 'pw' };
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, setUser: mockSetUser });
    mockUpdateUser.mockResolvedValue({ data: { updateUser: { password: 'new-password' } } });

    render(<UpdateUserProfile />);

    fireEvent.click(screen.getByTestId('mock-password-dialog'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
    });
  });

  // --- Branch coverage: if (!user) return for sections' handlers ---
  it('returns early in ProfileSection if no user', async () => {
    const { ProfileSection } = require('@/components/user/UpdateUserProfile');
    const { getByTestId } = render(<ProfileSection user={null} updateUser={mockUpdateUser} setUser={mockSetUser} />);

    fireEvent.click(getByTestId('mock-profile-upload'));
    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
      expect(mockSetUser).not.toHaveBeenCalled();
    });
  });

  it('returns early in PhoneSection if no user', async () => {
    const { PhoneSection } = require('@/components/user/UpdateUserProfile');
    render(<PhoneSection user={null} updateUser={mockUpdateUser} setUser={mockSetUser} />);
    fireEvent.click(screen.getByTestId('mock-phone-dialog'));
    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
  });

  it('returns early in EmailSection if no user', async () => {
    const { EmailSection } = require('@/components/user/UpdateUserProfile');
    render(<EmailSection user={null} updateUser={mockUpdateUser} setUser={mockSetUser} />);
    fireEvent.click(screen.getByTestId('mock-email-dialog'));
    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
  });

  it('returns early in PasswordSection if no user', async () => {
    const { PasswordSection } = require('@/components/user/UpdateUserProfile');
    render(<PasswordSection user={null} updateUser={mockUpdateUser} />);
    fireEvent.click(screen.getByTestId('mock-password-dialog'));
    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
  });

  // --- Fallback coverage: ?? and "Оруулаагүй" ---
  it('falls back to default values when user fields are null', () => {
    const mockUser = {
      userId: 'u1',
      email: null,
      phoneNumber: null,
      profile: null,
      password: null,
    };
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, setUser: mockSetUser });
    render(<UpdateUserProfile />);

    expect(screen.getAllByText('Оруулаагүй').length).toBeGreaterThan(0);
  });

  // --- Extra tests for safeSetUser & createUpdateInput ---
  it('safeSetUser does nothing if prev is null', () => {
    let currentUser = null;
    const mockSetUserFn = (fn: any) => {
      currentUser = fn(null); // prev = null
    };

    const { safeSetUser } = require('@/components/user/UpdateUserProfile');
    safeSetUser(mockSetUserFn, { email: 'new@example.com' });

    expect(currentUser).toBeNull();
  });

  it('createUpdateInput falls back to empty strings when fields are undefined', () => {
    const { createUpdateInput } = require('@/components/user/UpdateUserProfile');
    const user = { userId: 'u1' } as any; // бүх талбар undefined
    const input = createUpdateInput(user, {});
    expect(input).toEqual({
      email: '',
      password: '',
      phoneNumber: '',
      profile: '',
    });
  });

  it('ProfileSection updates user profile when updateUser returns new profile', async () => {
    const { ProfileSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = { userId: 'u1', email: 'e', password: 'pw', phoneNumber: 'p', profile: 'old.jpg' };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { profile: 'new.jpg' } } });

    render(<ProfileSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-profile-upload'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalled();
      expect(mockSetUserFn).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('PhoneSection updates user phoneNumber when updateUser returns new phoneNumber', async () => {
    const { PhoneSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = { userId: 'u1', email: 'e', password: 'pw', phoneNumber: 'old', profile: 'p.jpg' };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { phoneNumber: '99999999' } } });

    render(<PhoneSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-phone-dialog'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalled();
      expect(mockSetUserFn).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('EmailSection updates user email when updateUser returns new email', async () => {
    const { EmailSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = { userId: 'u1', email: 'old@example.com', password: 'pw', phoneNumber: '1234', profile: 'p.jpg' };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { email: 'new@example.com' } } });

    render(<EmailSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-email-dialog'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalled();
      expect(mockSetUserFn).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  // --- NEW: Negative cases to cover false branches (updated?.profile / phoneNumber / email === undefined) ---
  it('does not update profile if updateUser returns undefined profile', async () => {
    const { ProfileSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = { userId: 'u1', email: 'e', password: 'pw', phoneNumber: 'p', profile: 'old.jpg' };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { profile: undefined } } });

    render(<ProfileSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-profile-upload'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalled();
      expect(mockSetUserFn).not.toHaveBeenCalled();
    });
  });

  it('does not update phoneNumber if updateUser returns undefined phoneNumber', async () => {
    const { PhoneSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = { userId: 'u1', email: 'e', password: 'pw', phoneNumber: 'old', profile: 'p.jpg' };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { phoneNumber: undefined } } });

    render(<PhoneSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-phone-dialog'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalled();
      expect(mockSetUserFn).not.toHaveBeenCalled();
    });
  });

  it('does not update email if updateUser returns undefined email', async () => {
    const { EmailSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = { userId: 'u1', email: 'old@example.com', password: 'pw', phoneNumber: '1234', profile: 'p.jpg' };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { email: undefined } } });

    render(<EmailSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-email-dialog'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalled();
      expect(mockSetUserFn).not.toHaveBeenCalled();
    });
  });

  // --- NEW TESTS: Missing branch coverage for lines 21 and 53-55 ---

  // Test line 21: safeSetUser when prev is NOT null (the { ...prev, ...update } branch)
  it('safeSetUser updates user when prev is not null', () => {
    const mockUser = { userId: 'u1', email: 'old@example.com' };
    let currentUser = mockUser;

    const mockSetUserFn = (fn: any) => {
      currentUser = fn(currentUser); // prev is not null
    };

    const { safeSetUser } = require('@/components/user/UpdateUserProfile');
    safeSetUser(mockSetUserFn, { email: 'new@example.com' });

    expect(currentUser).toEqual({
      userId: 'u1',
      email: 'new@example.com',
    });
  });

  // Test lines 53-55: ProfileSection when user fields are NOT null/undefined
  it('ProfileSection uses user field values when they are not null/undefined (lines 53-55)', async () => {
    const { ProfileSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = {
      userId: 'u1',
      email: 'test@example.com', // defined - should use this value
      password: 'mypassword', // defined - should use this value
      phoneNumber: '12345678', // defined - should use this value
      profile: 'old.jpg',
    };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { profile: 'new.jpg' } } });

    render(<ProfileSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-profile-upload'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalledWith({
        variables: {
          userId: 'u1',
          input: {
            email: 'test@example.com', // used user.email (not fallback)
            password: 'mypassword', // used user.password (not fallback)
            phoneNumber: '12345678', // used user.phoneNumber (not fallback)
            profile: 'new-profile.jpg',
          },
        },
      });
    });
  });

  // Test lines 53-55: ProfileSection when user fields are null/undefined (fallback to '')
  it('ProfileSection falls back to empty strings when user fields are null/undefined (lines 53-55)', async () => {
    const { ProfileSection } = require('@/components/user/UpdateUserProfile');
    const mockUser = {
      userId: 'u1',
      email: null, // null - should fallback to ''
      password: undefined, // undefined - should fallback to ''
      phoneNumber: null, // null - should fallback to ''
      profile: 'old.jpg',
    };
    const mockSetUserFn = jest.fn();
    const mockUpdateUserFn = jest.fn().mockResolvedValue({ data: { updateUser: { profile: 'new.jpg' } } });

    render(<ProfileSection user={mockUser} updateUser={mockUpdateUserFn} setUser={mockSetUserFn} />);
    fireEvent.click(screen.getByTestId('mock-profile-upload'));

    await waitFor(() => {
      expect(mockUpdateUserFn).toHaveBeenCalledWith({
        variables: {
          userId: 'u1',
          input: {
            email: '', // fallback from null
            password: '', // fallback from undefined
            phoneNumber: '', // fallback from null
            profile: 'new-profile.jpg',
          },
        },
      });
    });
  });
});
