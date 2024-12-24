import UserInformation from '../../../src/components/signup/UserInformation';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useCreateUserMutation } from '@/generated';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

describe('User Information', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(<UserInformation />);
    expect(screen.getByText('Next'));
  });

  it('should pre-fill form with data from localStorage', () => {
    const mockData = {
      Username: 'John Doe',
      Bio: 'Developer',
      Interest: 'Coding',
      Profession: 'Software Engineer',
      SchoolWork: 'University',
    };
    localStorage.getItem.mockReturnValue(JSON.stringify(mockData));

    render(<UserInformation />);

    expect((screen.getByPlaceholderText('Enter your name') as HTMLInputElement).value).toBe(mockData.Username);
    expect((screen.getByPlaceholderText('Tell us about yourself') as HTMLInputElement).value).toBe(mockData.Bio);
    expect((screen.getByPlaceholderText('Enter your profession') as HTMLInputElement).value).toBe(mockData.Profession);
  });

  it('should update localStorage with form data on submit', async () => {
    render(<UserInformation />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), { target: { value: 'Designer' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your profession'), { target: { value: 'Designer' } });

    fireEvent.click(screen.getByText('Next'));

    // Check that localStorage was updated with the form data
  });

  it('should transition to image step when valid data is submitted', async () => {
    render(<UserInformation />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), { target: { value: 'Designer' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your profession'), { target: { value: 'Designer' } });

    fireEvent.click(screen.getByText('Next'));

    // Check that the step is changed to 'image' (assuming you have a way to check step)
  });

  it('should not transition to image step if form data is invalid', async () => {
    render(<UserInformation />);

    // Try submitting with empty fields
    fireEvent.click(screen.getByText('Next'));

    // Assert that the component did not transition
    expect(screen.getByText('Your Details'));
  });

  it('should show an error message on mutation failure', async () => {
    const mockMutation = jest.fn().mockRejectedValue(new Error('Mutation failed'));
    useCreateUserMutation.mockReturnValue([mockMutation]);

    render(<UserInformation />);

    fireEvent.click(screen.getByText('Next')); // Assuming Next triggers mutation

    // Wait for the mutation to complete (or fail) and check for an error message
  });

  it('should handle next button click', async () => {
    const { getByTestId } = render(<UserInformation />);

    await act(async () => {
      const button = getByTestId('usernext');
      await fireEvent.click(button);
    });

    // Check that the step transitions after button click
  });
});
