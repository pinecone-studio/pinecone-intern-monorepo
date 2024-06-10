import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useQuery } from '@apollo/client';
import { EmployeeData } from '../../src/app/payroll/_components/EmployeeData';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

const mockData = {
  getAllEmployee: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      imageUrl: 'https://via.placeholder.com/150',
      jobTitle: 'Software Engineer',
      salary: 1000000,
      bankName: 'Bank of America',
      bankAccountNumber: '123456789',
      bankAccountHolderName: 'John Doe',
    },
  ],
};

describe('EmployeeData', () => {
  it('renders loading state', async () => {
    (useQuery as jest.Mock).mockReturnValue({ loading: true });

    await act(async () => {
      render(<EmployeeData />);
    });

    expect(screen.getByTestId('loading').textContent).toBe('Loading...');
  });

  it('renders error state', async () => {
    (useQuery as jest.Mock).mockReturnValue({ loading: false, error: new Error('Error occurred') });

    await act(async () => {
      render(<EmployeeData />);
    });

    expect(screen.getByTestId('error').textContent).toBe('Error: Error occurred');
  });

  it('renders employee data', async () => {
    (useQuery as jest.Mock).mockReturnValue({ loading: false, data: mockData });

    await act(async () => {
      render(<EmployeeData />);
    });

    expect(screen.getByTestId('id').textContent).toBe('1');
    expect(screen.getByTestId('email').textContent).toBe('john.doe@example.com');
    expect(screen.getByTestId('phone').textContent).toBe('123-456-7890');
    expect(screen.getByTestId('name').textContent).toBe('John');
    expect(screen.getByTestId('bank').textContent).toBe('Bank of America');
    expect(screen.getByTestId('account').textContent).toBe('123456789');
    expect(screen.getByTestId('holder').textContent).toBe('John Doe');
    expect(screen.getByTestId('job').textContent).toBe('Software Engineer');
  });
});
