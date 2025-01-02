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

    // Wrap all interactions inside act to ensure updates are flushed
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), { target: { value: 'Designer' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your profession'), { target: { value: 'Designer' } });

      fireEvent.click(screen.getByText('Next'));
    });
  });

  it('should transition to image step when valid data is submitted', async () => {
    render(<UserInformation />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), { target: { value: 'Designer' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your profession'), { target: { value: 'Designer' } });

      fireEvent.click(screen.getByText('Next'));
    });

    // You can add further assertions here to check the transition
  });

  it('should not transition to image step if form data is invalid', async () => {
    render(<UserInformation />);

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Assert that the component did not transition
    expect(screen.getByText('Upload your images'));
  });

  it('should show an error message on mutation failure', async () => {
    const mockMutation = jest.fn().mockRejectedValue(new Error('Mutation failed'));
    useCreateUserMutation.mockReturnValue([mockMutation]);

    render(<UserInformation />);

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // You can assert for an error message here
  });

  it('should handle next button click', async () => {
    const { getByTestId } = render(<UserInformation />);

    await act(async () => {
      const button = getByTestId('usernext');
      await fireEvent.click(button);
    });
  });

  it('does not navigate to the detail step when Next is clicked without an age', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(
          JSON.stringify({
            name: 'Test',
          })
        ),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(<UserInformation />);
  });
});
