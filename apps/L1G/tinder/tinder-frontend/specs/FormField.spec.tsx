/* eslint-disable max-lines */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetAllInterestsQuery, useUpdateProfileMutation } from '@/generated';
import { ProfileForm } from '@/components/FormFIeld';

// Mock GraphQL hooks
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

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'New bio' } });
    fireEvent.change(screen.getByLabelText(/Profession/i), { target: { value: 'New profession' } });
    fireEvent.change(screen.getByLabelText(/School\/Work/i), { target: { value: 'New school/work' } });

    // Select interests - simulate MultiSelect change by firing change event on the hidden input or call onChange handler
    // Since MultiSelect is custom, you can either:
    // - mock MultiSelect component, or
    // - simulate onValueChange event by calling field.onChange directly
    // For simplicity, skipping multi-select simulation here (or if accessible, test with MultiSelect separately)

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      // updateUserData should be called with form values
      expect(mockUpdateUserData).toHaveBeenCalledWith({
        name: 'New Name',
        bio: 'New bio',
        interests: expect.any(Array),
        profession: 'New profession',
        schoolWork: 'New school/work',
      });

      // updateProfile mutation called with userData values (note: your component uses userData values in variables)
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        variables: {
          updateProfileId: userData.id,
          name: userData.name,
          bio: userData.bio,
          interests: userData.interests,
          profession: userData.profession,
          schoolWork: userData.schoolWork,
        },
      });

      // onSuccess called after mutation returns success
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
});
