import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MyProfileForm } from '@/components/MyProfileForm';

// Mock the onSubmit function to test form submission
const mockOnSubmit = jest.fn();

describe('MyProfileForm', () => {
  it('renders without crashing', () => {
    render(<MyProfileForm />);

    // Ensure form elements are rendered
    expect(screen.getByText('Personal Information'));
    expect(screen.getByText('This is how others will see you on the site.'));
    expect(screen.getByLabelText('Name'));
    expect(screen.getByLabelText('Email'));
    expect(screen.getByLabelText('Birth Date'));
    expect(screen.getByLabelText('Gender Preference'));
    expect(screen.getByLabelText('Bio'));
  });

  it('should show validation errors when required fields are missing', async () => {
    render(<MyProfileForm />);

    // Simulate submitting the form without filling out any fields
    fireEvent.click(screen.getByText('Update Profile'));

    // Check if validation error messages appear
    await waitFor(() => {
      expect(screen.getByText('String must contain at least 2 character(s)')); // For Name
      expect(screen.getByText('Please enter a valid email')); // For Email
      expect(screen.getByText('A date of birth is required.')); // For Birth Date
      expect(screen.getByText('String must contain at least 1 character(s)')); // For Gender Preference
    });
  });

  it('should successfully submit the form with valid data', async () => {
    render(<MyProfileForm />);

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Birth Date'), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText('Gender Preference'), { target: { value: 'Men' } });
    fireEvent.change(screen.getByLabelText('Bio'), { target: { value: 'This is my bio.' } });

    // Simulate submitting the form
    fireEvent.click(screen.getByText('Update Profile'));

    // Assert that the mockOnSubmit function was called
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it('should select multiple interests from MultiSelect', async () => {
    render(<MyProfileForm />);

    // Open the MultiSelect component and select interests
    const multiSelect = screen.getByTestId('multi-select-trigger');
    fireEvent.mouseDown(multiSelect);

    const musicOption = screen.getByText('Music');
    const sportsOption = screen.getByText('Sports');
    fireEvent.click(musicOption);
    fireEvent.click(sportsOption);

    // Verify that the selected interests are displayed
    expect(screen.getByText('Music'));
    expect(screen.getByText('Sports'));
  });
});
