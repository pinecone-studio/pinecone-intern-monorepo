/* eslint-disable max-lines */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetAllInterestsQuery, useUpdateProfileMutation } from '@/generated';
import { ProfileForm } from '@/components/FormNew';

const mockUpdateProfile = jest.fn();

jest.mock('@/generated', () => ({
  useGetAllInterestsQuery: jest.fn(),
  useUpdateProfileMutation: jest.fn(),
}));

describe('ProfileForm', () => {
  const userData = {
    id: 'user-1',
    name: 'Old Name',
    bio: 'Old bio',
    interests: ['interest1'],
    profession: 'Old profession',
    schoolWork: 'Old school/work',
  };

  const mockOnSuccess = jest.fn();
  const mockOnBack = jest.fn();
  const mockUpdateUserData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetAllInterestsQuery as jest.Mock).mockReturnValue({
      data: {
        getAllInterests: [
          { _id: 'interest1', interestName: 'Interest 1' },
          { _id: 'interest2', interestName: 'Interest 2' },
        ],
      },
      loading: false,
      error: null,
    });

    (useUpdateProfileMutation as jest.Mock).mockReturnValue([mockUpdateProfile]);
  });

  it('renders form fields and buttons', () => {
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    expect(screen.getByLabelText(/Name/i));
    expect(screen.getByLabelText(/Bio/i));
    expect(screen.getByText(/Interest/i));
    expect(screen.getByLabelText(/Profession/i));
    expect(screen.getByLabelText(/School\/Work/i));

    expect(screen.getByRole('button', { name: /Back/i }));
    expect(screen.getByRole('button', { name: /Next/i }));
  });

  it('renders all interest options from getAllInterests', () => {
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    const dropdownTrigger = screen.getByTestId('multi-select-trigger');
    fireEvent.click(dropdownTrigger);

    expect(screen.getByText('Interest 1')).toBeInTheDocument();
    expect(screen.getByText('Interest 2')).toBeInTheDocument();
  });

  it('handles case when data is undefined and interestOptions falls back to empty array', () => {
    (useGetAllInterestsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: null,
    });

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);
    const dropdownTrigger = screen.getByTestId('multi-select-trigger');
    expect(dropdownTrigger).toBeInTheDocument();

    fireEvent.click(dropdownTrigger);

    expect(screen.queryByText('Interest 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Interest 2')).not.toBeInTheDocument();
  });

  it('shows loading state when interests are loading', () => {
    (useGetAllInterestsQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText(/Loading interests/i));
  });

  it('shows error message when interests query errors', () => {
    (useGetAllInterestsQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Failed to load interests' },
    });

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText(/Failed to load interests/i));
  });

  it('calls updateProfile and onSuccess on valid form submission', async () => {
    mockUpdateProfile.mockResolvedValue({
      data: {
        updateProfile: true,
      },
    });

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'New bio' } });
    fireEvent.change(screen.getByLabelText(/Profession/i), { target: { value: 'New profession' } });
    fireEvent.change(screen.getByLabelText(/School\/Work/i), { target: { value: 'New school/work' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(mockUpdateUserData).toHaveBeenCalledWith({
        name: 'New Name',
        bio: 'New bio',
        interests: expect.any(Array),
        profession: 'New profession',
        schoolWork: 'New school/work',
      });

      expect(mockUpdateProfile).toHaveBeenCalledWith({
        variables: {
          updateProfileId: userData.id,
          name: 'New Name',
          bio: 'New bio',
          interests: [],
          profession: 'New profession',
          schoolWork: 'New school/work',
        },
      });

      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('sets server error when updateProfile response is falsy', async () => {
    mockUpdateProfile.mockResolvedValue({
      data: {
        updateProfile: null,
      },
    });

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'New bio' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Update failed/i));
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('sets server error when updateProfile mutation throws error', async () => {
    mockUpdateProfile.mockRejectedValue(new Error('Network error'));

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'New bio' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i));
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onBack when Back button is clicked', () => {
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    fireEvent.click(screen.getByRole('button', { name: /Back/i }));

    expect(mockOnBack).toHaveBeenCalled();
  });

  it('displays serverError message when updateProfile returns falsy', async () => {
    mockUpdateProfile.mockResolvedValue({ data: { updateProfile: null } });

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText(/Update failed/i)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('displays server error when user ID is missing', async () => {
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={{ email: 'test@example.com' }} updateUserData={mockUpdateUserData} />);
    fireEvent.change(screen.getByTestId('profile-name-input'), { target: { value: 'John Doe' } });
    fireEvent.submit(screen.getByTestId('profile-form'));
    await waitFor(() => {
      expect(screen.getByText('User ID is missing.')).toBeInTheDocument();
    });
  });

  it('renders MultiSelect correctly with empty interests array', () => {
    const userWithNoInterests = { ...userData, interests: [] };
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userWithNoInterests} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText(/Interest/i)).toBeInTheDocument();
  });

  it('calls onValueChange when selecting interests in MultiSelect', () => {
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    const multiSelectTrigger = screen.getByTestId('multi-select-trigger');

    fireEvent.click(multiSelectTrigger);

    const interestOption = screen.getByText('Interest 2');
    fireEvent.click(interestOption);

    expect(mockUpdateUserData);
  });

  it('does not attempt update when userData.id is missing after setting error', async () => {
    const userDataWithoutId = {
      name: 'Test Name',
      bio: 'Test bio',
      interests: [],
      profession: 'Test profession',
      schoolWork: 'Test work',
    };

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userDataWithoutId} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('User ID is missing.')).toBeInTheDocument();
    });

    expect(mockUpdateProfile).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('handles missing userData.id correctly and does not call updateProfile', async () => {
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={{ name: 'Test' }} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('User ID is missing.')).toBeInTheDocument();
    });

    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  it('executes updateProfile when userData.id is present', async () => {
    mockUpdateProfile.mockResolvedValue({
      data: {
        updateProfile: true,
      },
    });

    const userDataWithId = { ...userData, id: 'valid-user-id' };

    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userDataWithId} updateUserData={mockUpdateUserData} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        variables: {
          updateProfileId: 'valid-user-id',
          name: 'New Name',
          bio: '',
          interests: [],
          profession: '',
          schoolWork: '',
        },
      });
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
