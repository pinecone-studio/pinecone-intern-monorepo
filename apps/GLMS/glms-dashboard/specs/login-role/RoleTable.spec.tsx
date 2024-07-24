import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleTable from '../../src/app/login-role/components/RoleTable';
import { useGetGlmsUsersQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetGlmsUsersQuery: jest.fn(),
}));

const mockData = {
  getGlmsUsers: [
    {
      _id: '12345',
      firstName: 'John',
      roles: 'Admin',
      email: 'john.doe@example.com',
    },
    {
      _id: '67890',
      firstName: 'Jane',
      roles: 'User',
      email: 'jane.doe@example.com',
    },
  ],
};

describe('RoleTable Component', () => {
  beforeEach(() => {
    useGetGlmsUsersQuery.mockReturnValue({
      data: mockData,
      refetch: jest.fn(),
      loading: false,
    });
  });

  test('renders table headers correctly', () => {
    render(<RoleTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Roles')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('renders table cells correctly', () => {
    render(<RoleTable />);
    const { getGlmsUsers } = mockData;

    getGlmsUsers.forEach((user, index) => {
      expect(screen.getByText(user.firstName)).toBeInTheDocument();
      expect(screen.getByText(user._id)).toBeInTheDocument();
      expect(screen.getByText(user.roles)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  test('renders RoleModal and DeleteIcon in each row', () => {
    render(<RoleTable />);
    const rows = screen.getAllByTestId('table-row');

    rows.forEach((row) => {
      expect(within(row).getAllByRole('button').length).toBe(2); // Expecting RoleModal and DeleteIcon button
    });
  });
});
