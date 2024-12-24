import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Addpassword from '@/components/signup/Addpassword';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/generated';
import React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

describe('Addpassword Component', () => {
  const mockCreateUser = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCreateUserMutation as jest.Mock).mockReturnValue([mockCreateUser]);
  });

  it('should render the component correctly', () => {
    render(<Addpassword />);
    expect(screen.getByText('Create password'));
    expect(screen.getByLabelText('Password'));
    expect(screen.getByLabelText('Confirm password'));
    expect(screen.getByText('Continue'));
  });
  it('should not set password if it does not exist in localStorage', async () => {
    localStorage.setItem('signupFormData', JSON.stringify({}));

    const mockSetPassword = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => ['', mockSetPassword]);

    render(<Addpassword />);
    await waitFor(() => {
      expect(mockSetPassword).not.toHaveBeenCalled();
    });
  });
  it('should show an error for short passwords', async () => {
    render(<Addpassword />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 5 characters long.'));
    });
  });

  it('should show an error when passwords do not match', async () => {
    render(<Addpassword />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Continue'));
  });
  it('should show an error when passwords do not match', async () => {
    render(<Addpassword />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('continue-btn'));
  });

  it('should call createUser mutation and redirect on successful submission', async () => {
    mockCreateUser.mockResolvedValue({ data: { createUser: { id: '1' } } });

    render(<Addpassword />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Continue'));
  });

  it('should show an error message on mutation failure', async () => {
    mockCreateUser.mockRejectedValue(new Error('Network error'));

    render(<Addpassword />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Continue'));
  });

  it('should show an error message on mutation failure', async () => {
    mockCreateUser.mockRejectedValue(new Error('Network error'));

    Storage.prototype.getItem = jest.fn(() => null);

    render(<Addpassword />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Continue'));
  });
});
