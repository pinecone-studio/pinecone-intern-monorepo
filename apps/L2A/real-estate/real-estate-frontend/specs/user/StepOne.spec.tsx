import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCreateUserMutation } from '@/generated';
import { StepOne } from '@/app/signup/_components/StepOne';

jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

describe('StepOne Component', () => {
  const mockSetStep = jest.fn();
  const mockCreateUser = jest.fn();
  const mockSetParentEmail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateUserMutation as jest.Mock).mockReturnValue([
      mockCreateUser,
      { loading: false },
    ]);
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('renders the email input field and submit button', () => {
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    fireEvent.submit(screen.getByTestId('step-one-form'));
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Email is required');
    });
  });

  it('calls createUser mutation with email when form is submitted', async () => {
    const testEmail = 'test@example.com';
    mockCreateUser.mockResolvedValueOnce({
      data: { createUser: { email: testEmail } }
    });
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: testEmail }
    });
    fireEvent.submit(screen.getByTestId('step-one-form'));
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        variables: { email: testEmail }
      });
    });
  });

  it('stores email in localStorage and advances to step 3 on successful submission', async () => {
    const testEmail = 'test@example.com';
    mockCreateUser.mockResolvedValueOnce({
      data: { createUser: { email: testEmail } }
    });
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: testEmail }
    });
    fireEvent.submit(screen.getByTestId('step-one-form'));
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith('email', testEmail);
      expect(mockSetStep).toHaveBeenCalledWith(2);
      expect(mockSetParentEmail).toHaveBeenCalledWith(testEmail); 
    });
  });

  it('shows error message when mutation fails', async () => {
    mockCreateUser.mockRejectedValueOnce(new Error('Mutation failed'));
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.submit(screen.getByTestId('step-one-form'));
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Create new email failed');
    });
  });

  it('displays loading state on button during mutation', () => {
    (useCreateUserMutation as jest.Mock).mockReturnValue([
      mockCreateUser,
      { loading: true },
    ]);
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  it('clears error when user starts typing', async () => {
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);
    fireEvent.submit(screen.getByTestId('step-one-form'));
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Email is required');
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 't' }
    });    
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  it('does not proceed if createUser returns data without email', async () => {
    const testEmail = 'test@example.com';
    mockCreateUser.mockResolvedValueOnce({
      data: { 
        createUser: {         } 
      }
    });
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: testEmail }
    });
    fireEvent.submit(screen.getByTestId('step-one-form'));    
    await waitFor(() => {
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
      expect(mockSetStep).not.toHaveBeenCalled();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  it('does not proceed if createUser returns null data', async () => {
    const testEmail = 'test@example.com';
    mockCreateUser.mockResolvedValueOnce({
      data: null
    });
    render(<StepOne setStep={mockSetStep} setEmail={mockSetParentEmail}  />);    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: testEmail }
    });
    fireEvent.submit(screen.getByTestId('step-one-form'));    
    await waitFor(() => {
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
      expect(mockSetStep).not.toHaveBeenCalled();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });
});