import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Addpassword from '@/components/signup/Addpassword';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/generated';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the @/generated module
jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

describe('Addpassword Component', () => {
  const mockFormData = {
    email: 'test@example.com',
  };

  const mockCreateUser = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCreateUserMutation as jest.Mock).mockReturnValue([mockCreateUser]);
  });

  it('should render the component correctly', () => {
    render(<Addpassword formData={mockFormData} />);
    expect(screen.getByText('Create password'));
    expect(screen.getByLabelText('Password'));
    expect(screen.getByLabelText('Confirm password'));
    expect(screen.getByText('Continue'));
  });

  it('should show an error for short passwords', async () => {
    render(<Addpassword formData={mockFormData} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 5 characters long.'));
    });
  });

  it('should show an error when passwords do not match', async () => {
    render(<Addpassword formData={mockFormData} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Continue'));
  });

  it('should call createUser mutation and redirect on successful submission', async () => {
    mockCreateUser.mockResolvedValue({ data: { createUser: { id: '1' } } });

    render(<Addpassword formData={mockFormData} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            password: '12345',
            fullname: '',
            username: '',
          },
        },
      });
      expect(mockPush);
    });
  });

  it('should show an error message on mutation failure', async () => {
    mockCreateUser.mockRejectedValue(new Error('Network error'));

    render(<Addpassword formData={mockFormData} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Continue'));
  });
});
