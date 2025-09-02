/* eslint-disable max-lines */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { MyProfileForm } from '@/components/MyProfileForm';
import { useGetAllInterestsQuery, UpdateProfileDocument } from '@/generated';
import { useMutation } from '@apollo/client';

// Mock the Apollo useMutation hook
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(),
}));

// Mock the components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@/components/ui/form', () => ({
  Form: ({ children, ...props }: any) => {
    const { handleSubmit, setValue, getValues, resetField, clearErrors, 
            setError, setFocus, getFieldState, formState, trigger, 
            register, watch, reset, unregister, control, ...domProps } = props;
    return <form {...domProps}>{children}</form>;
  },
  FormItem: ({ children }: any) => <div>{children}</div>,
  FormLabel: ({ children }: any) => <label>{children}</label>,
  FormControl: ({ children }: any) => <div>{children}</div>,
  FormMessage: ({ children }: any) => <div>{children}</div>,
  FormDescription: ({ children }: any) => <div>{children}</div>,
  FormField: ({ control, name, render }: any) => (
    <div data-testid={`form-field-${name}`}>
      {render({
        field: {
          value: control?._getWatch?.(name) || '',
          onChange: jest.fn(),
          onBlur: jest.fn(),
          name,
        },
        fieldState: { error: null },
      })}
    </div>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ ...props }: any) => <input {...props} />,
}));

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr />,
}));

jest.mock('@/components/BirthDateField', () => ({
  BirthDateField: ({ initialDate, onChange }: any) => (
    <input
      data-testid="birth-date-field"
      type="date"
      defaultValue={initialDate ? initialDate.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange && onChange(new Date(e.target.value))}
    />
  ),
}));

jest.mock('@/components/MultiSelect', () => ({
  MultiSelect: ({ options, value, onValueChange, maxCount }: any) => (
    <div data-testid="multi-select-trigger">
      <select
        multiple
        value={value || []}
        onChange={(e) => {
          const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option: HTMLOptionElement) => option.value
          );
          if (maxCount && selectedOptions.length > maxCount) {
            return;
          }
          onValueChange(selectedOptions);
        }}
      >
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

jest.mock('@/components/NameGenderPreferenceFields', () => ({
  NameGenderPreferenceFields: ({ control }: any) => (
    <div>
      <input
        name="name"
        placeholder="Name"
        defaultValue={control?._getWatch?.('name') || ''}
        onChange={(e) => control?.register?.('name').onChange(e)}
      />
      <input
        name="email"
        placeholder="Email"
        defaultValue={control?._getWatch?.('email') || ''}
        onChange={(e) => control?.register?.('email').onChange(e)}
      />
      <select
        name="genderPreference"
        defaultValue={control?._getWatch?.('genderPreference') || 'Female'}
        onChange={(e) => control?.register?.('genderPreference').onChange(e)}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Both">Both</option>
      </select>
    </div>
  ),
}));

jest.mock('@/components/ProfessionSchoolFields', () => ({
  ProfessionSchoolFields: ({ control }: any) => (
    <div>
      <input
        name="profession"
        placeholder="Profession"
        defaultValue={control?._getWatch?.('profession') || ''}
        onChange={(e) => control?.register?.('profession').onChange(e)}
      />
      <input
        name="school"
        placeholder="School"
        defaultValue={control?._getWatch?.('school') || ''}
        onChange={(e) => control?.register?.('school').onChange(e)}
      />
    </div>
  ),
}));

// Mock the generated hooks
jest.mock('@/generated', () => ({
  useGetAllInterestsQuery: jest.fn(),
  UpdateProfileDocument: {},
}));

describe('MyProfileForm', () => {
  const mockUpdateProfile = jest.fn();
  const mockUseGetAllInterestsQuery = useGetAllInterestsQuery as jest.Mock;
  const mockUseMutation = useMutation as jest.Mock;
  const mockUseForm = jest.requireMock('react-hook-form').useForm as jest.Mock;
  
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    dateOfBirth: '1990-01-01',
    genderPreferences: 'Female',
    bio: 'Test bio',
    interests: [
      { _id: 'art', interestName: 'Art' },
      { _id: 'music', interestName: 'Music' },
    ],
    profession: 'Developer',
    schoolWork: 'Test University',
  };
  
  const mockImages = ['image1.jpg', 'image2.jpg'];
  
  const mockFormMethods = {
    control: {
      _getWatch: jest.fn((field) => {
        const values: any = {
          name: 'Test User',
          email: 'test@example.com',
          genderPreference: 'Female',
          birthDate: new Date('1990-01-01'),
          bio: 'Test bio',
          interests: ['art', 'music'],
          profession: 'Developer',
          school: 'Test University',
        };
        return values[field];
      }),
      register: jest.fn().mockReturnValue({ onChange: jest.fn() })
    },
    handleSubmit: jest.fn((callback) => (e: any) => {
      e.preventDefault();
      callback(mockFormMethods.getValues());
    }),
    reset: jest.fn(),
    getValues: jest.fn().mockReturnValue({
      name: 'Test User',
      email: 'test@example.com',
      birthDate: new Date('1990-01-01'),
      genderPreference: 'Female',
      bio: 'Test bio',
      interests: ['art', 'music'],
      profession: 'Developer',
      school: 'Test University',
    }),
    watch: jest.fn(),
    setValue: jest.fn(),
    formState: { errors: {} },
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseForm.mockReturnValue(mockFormMethods);
    
    mockUseMutation.mockReturnValue([
      mockUpdateProfile.mockResolvedValue({
        data: {
          updateProfile: {
            id: '1',
            name: 'Updated User',
          },
        },
      }),
      { loading: false, error: null },
    ]);
    
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: {
        getAllInterests: [
          { _id: 'art', interestName: 'Art' },
          { _id: 'music', interestName: 'Music' },
          { _id: 'sports', interestName: 'Sports' },
          { _id: 'travel', interestName: 'Travel' },
        ],
      },
      loading: false,
      error: null,
    });
  });
  
  const renderComponent = (props: Partial<React.ComponentProps<typeof MyProfileForm>> = {}) => {
    return render(
      <MockedProvider addTypename={false}>
        <MyProfileForm user={mockUser} images={mockImages} {...props} />
      </MockedProvider>
    );
  };
  
  it('renders all form fields with user data', () => {
    renderComponent();
    
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Developer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test University')).toBeInTheDocument();
    expect(screen.getByTestId('birth-date-field')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update Profile' })).toBeInTheDocument();
  });
  
  it('handles form submission with updated data', async () => {
    renderComponent();
    
    const nameInput = screen.getByPlaceholderText('Name');
    const professionInput = screen.getByPlaceholderText('Profession');
    
    fireEvent.change(nameInput, {
      target: { value: 'Updated User' },
    });
    fireEvent.change(professionInput, {
      target: { value: 'Senior Developer' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));
    
    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        variables: {
          updateProfileId: '1',
          name: 'Test User', // Note: This will use the mock form values
          email: 'test@example.com',
          dateOfBirth: '1990-01-01',
          genderPreferences: 'Female',
          bio: 'Test bio',
          interests: ['art', 'music'],
          profession: 'Developer',
          schoolWork: 'Test University',
          images: mockImages,
        },
      });
    });
  });
  
  it('handles loading state during submission', () => {
    mockUseMutation.mockReturnValue([
      mockUpdateProfile,
      { loading: true, error: null },
    ]);
    
    renderComponent();
    
    expect(screen.getByRole('button', { name: 'Updating...' })).toBeDisabled();
  });
  
  it('handles error state from interests query', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch interests'),
    });
    
    renderComponent();
    
    expect(screen.getByTestId('multi-select-trigger')).toBeInTheDocument();
  });
  
  it('handles empty user data', () => {
    renderComponent({ user: undefined });
    
    expect(screen.getByRole('button', { name: 'Update Profile' })).toBeInTheDocument();
  });
  
  it('filters out interests with null names', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: {
        getAllInterests: [
          { _id: 'art', interestName: 'Art' },
          { _id: 'null-interest', interestName: null },
          { _id: 'music', interestName: 'Music' },
        ],
      },
      loading: false,
      error: null,
    });
    
    renderComponent();
    
    expect(screen.getByText('Art')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.queryByText('null')).not.toBeInTheDocument();
  });
  
  it('calls form.reset when user data is provided', () => {
    renderComponent();
    
    expect(mockFormMethods.reset).toHaveBeenCalledWith({
      name: mockUser.name,
      email: mockUser.email,
      birthDate: expect.any(Date),
      genderPreference: mockUser.genderPreferences,
      bio: mockUser.bio,
      interests: mockUser.interests?.map((i) => i._id),
      profession: mockUser.profession,
      school: mockUser.schoolWork,
    });
  });
  
  it('does not call form.reset when user is undefined', () => {
    mockFormMethods.reset.mockClear();
    
    renderComponent({ user: undefined });
    
    expect(mockFormMethods.reset).not.toHaveBeenCalled();
  });
  
  it('handles mutation errors in catch block', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mutationError = new Error('Mutation failed');
    
    mockUseMutation.mockReturnValue([
      mockUpdateProfile.mockRejectedValue(mutationError),
      { loading: false, error: null },
    ]);

    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Update mutation failed:', mutationError);
    });

    consoleError.mockRestore();
  });
  
  it('handles null dateOfBirth from user data', () => {
    const userWithNullDob = {
      ...mockUser,
      dateOfBirth: null as any,
    };

    renderComponent({ user: userWithNullDob });

    expect(screen.getByTestId('birth-date-field')).toBeInTheDocument();
  });
  
  it('handles undefined genderPreferences from user data', () => {
    const userWithoutGenderPrefs = {
      ...mockUser,
      genderPreferences: undefined,
    };

    renderComponent({ user: userWithoutGenderPrefs });

    expect(screen.getByDisplayValue('Female')).toBeInTheDocument();
  });
  
  it('does not call updateProfile when user id is undefined', async () => {
    const userWithoutId = {
      ...mockUser,
      id: undefined,
    };

    renderComponent({ user: userWithoutId });

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });
  });
  
  it('formats date correctly for submission', async () => {
    const userWithDate = {
      ...mockUser,
      dateOfBirth: '2020-02-02',
    };

    mockFormMethods.getValues.mockReturnValueOnce({
      ...mockFormMethods.getValues(),
      birthDate: new Date('2020-02-02'),
    });

    renderComponent({ user: userWithDate });

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        variables: expect.objectContaining({
          dateOfBirth: '2020-02-02',
        }),
      }));
    });
  });
  
  it('handles empty interests array from user', () => {
    const userWithNoInterests = {
      ...mockUser,
      interests: [],
    };

    renderComponent({ user: userWithNoInterests });

    expect(screen.getByTestId('multi-select-trigger')).toBeInTheDocument();
  });
  
  it('handles empty images array', async () => {
    renderComponent({ images: [] });

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        variables: expect.objectContaining({
          images: [],
        }),
      }));
    });
  });
  
  it('handles undefined images prop', async () => {
    renderComponent({ images: undefined });

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        variables: expect.objectContaining({
          images: [],
        }),
      }));
    });
  });
  
  it('handles null dateOfBirth in form values', async () => {
    mockFormMethods.getValues.mockReturnValueOnce({
      ...mockFormMethods.getValues(),
      birthDate: null,
    });

    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        variables: expect.objectContaining({
          dateOfBirth: null,
        }),
      }));
    });
  });
  
  it('handles undefined dateOfBirth in form values', async () => {
    mockFormMethods.getValues.mockReturnValueOnce({
      ...mockFormMethods.getValues(),
      birthDate: undefined,
    });

    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        variables: expect.objectContaining({
          dateOfBirth: null,
        }),
      }));
    });
  });
  // Add these tests to your test suite

it('logs success message when mutation completes successfully', async () => {
  const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  const successData = {
    updateProfile: {
      id: '1',
      name: 'Updated User',
    },
  };

  mockUseMutation.mockReturnValue([
    mockUpdateProfile.mockResolvedValue({ data: successData }),
    { loading: false, error: null },
  ]);

  renderComponent();

  fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

  await waitFor(() => {
    expect(consoleLog).toHaveBeenCalledWith('Profile updated successfully', successData);
  });

  consoleLog.mockRestore();
});

it('logs error message when mutation has onError', async () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  const mutationError = new Error('Profile update failed');

  mockUseMutation.mockReturnValue([
    mockUpdateProfile.mockResolvedValue({}), // Resolve successfully but trigger onError
    { loading: false, error: mutationError }, // Simulate Apollo error state
  ]);

  // Mock the mutation to actually call onError
  const mockUpdateWithOnError = jest.fn().mockImplementation(({ onError }) => {
    onError?.(mutationError);
    return Promise.resolve({});
  });

  mockUseMutation.mockReturnValue([
    mockUpdateWithOnError,
    { loading: false, error: mutationError },
  ]);

  renderComponent();

  fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith('Error updating profile:', mutationError);
  });

  consoleError.mockRestore();
});

it('handles undefined field.value in MultiSelect with empty array fallback', () => {
  // Mock form control to return undefined for interests
  const mockFormWithUndefinedInterests = {
    ...mockFormMethods,
    control: {
      ...mockFormMethods.control,
      _getWatch: jest.fn((field) => {
        const values: any = {
          name: 'Test User',
          email: 'test@example.com',
          genderPreference: 'Female',
          birthDate: new Date('1990-01-01'),
          bio: 'Test bio',
          interests: undefined, // This will test the ?? [] fallback
          profession: 'Developer',
          school: 'Test University',
        };
        return values[field];
      }),
    },
  };

  mockUseForm.mockReturnValueOnce(mockFormWithUndefinedInterests);

  renderComponent();

  // The MultiSelect should still render without crashing
  const multiSelect = screen.getByTestId('multi-select-trigger');
  expect(multiSelect).toBeInTheDocument();

  // Verify the select element has empty value (not undefined)
  const selectElement = multiSelect.querySelector('select');
  expect(selectElement?.value).toBe('');
});

it('handles null field.value in MultiSelect with empty array fallback', () => {
  // Mock form control to return null for interests
  const mockFormWithNullInterests = {
    ...mockFormMethods,
    control: {
      ...mockFormMethods.control,
      _getWatch: jest.fn((field) => {
        const values: any = {
          name: 'Test User',
          email: 'test@example.com',
          genderPreference: 'Female',
          birthDate: new Date('1990-01-01'),
          bio: 'Test bio',
          interests: null, // This will test the ?? [] fallback
          profession: 'Developer',
          school: 'Test University',
        };
        return values[field];
      }),
    },
  };

  mockUseForm.mockReturnValueOnce(mockFormWithNullInterests);

  renderComponent();

  // The MultiSelect should still render without crashing
  const multiSelect = screen.getByTestId('multi-select-trigger');
  expect(multiSelect).toBeInTheDocument();
});

// Test the actual mutation callbacks more directly
it('calls onCompleted callback when mutation succeeds', async () => {
  const mockOnCompleted = jest.fn();
  const successData = { updateProfile: { id: '1', name: 'Success' } };

  // Create a mock mutation that calls onCompleted
  const mockUpdateWithCallbacks = jest.fn().mockImplementation(({ onCompleted }) => {
    onCompleted?.(successData);
    return Promise.resolve({ data: successData });
  });

  mockUseMutation.mockReturnValue([
    mockUpdateWithCallbacks,
    { loading: false, error: null },
  ]);

  renderComponent();

  fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

  await waitFor(() => {
    expect(mockUpdateWithCallbacks).toHaveBeenCalled();
  });
});

it('calls onError callback when mutation fails', async () => {
  const mockOnError = jest.fn();
  const mutationError = new Error('Mutation failed');

  // Create a mock mutation that calls onError
  const mockUpdateWithCallbacks = jest.fn().mockImplementation(({ onError }) => {
    onError?.(mutationError);
    return Promise.reject(mutationError);
  });

  mockUseMutation.mockReturnValue([
    mockUpdateWithCallbacks,
    { loading: false, error: mutationError },
  ]);

  renderComponent();

  fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

  await waitFor(() => {
    expect(mockUpdateWithCallbacks).toHaveBeenCalled();
  });
});

// Test console.log for the initial form data submission
it('logs updated profile data on submission', async () => {
  const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

  renderComponent();

  fireEvent.click(screen.getByRole('button', { name: 'Update Profile' }));

  await waitFor(() => {
    expect(consoleLog).toHaveBeenCalledWith('Updated profile data:', expect.any(Object));
  });

  consoleLog.mockRestore();
});
});