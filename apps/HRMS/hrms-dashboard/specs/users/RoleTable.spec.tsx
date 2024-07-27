
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleTable from '../../src/app/users/components/RoleTable';


const mockUsersData = [
  { _id: '1', firstName: 'John', role: 'Admin', email: 'john@example.com' },
  { _id: '2', firstName: 'Jane', role: 'User', email: 'jane@example.com' },
];

const mockHandleDelete = jest.fn();

describe('RoleTable', () => {
  it('renders the table with correct headers', () => {
    render(<RoleTable usersData={mockUsersData} handleDelete={mockHandleDelete} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Roles')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders user data correctly', () => {
    render(<RoleTable usersData={mockUsersData} handleDelete={mockHandleDelete} />);
    
    mockUsersData.forEach(user => {
      expect(screen.getByText(user.firstName)).toBeInTheDocument();
      expect(screen.getByText(user._id)).toBeInTheDocument();
      expect(screen.getByText(user.role)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it('calls handleDelete when delete button is clicked', () => {
    render(<RoleTable usersData={mockUsersData} handleDelete={mockHandleDelete} />);
    
    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockHandleDelete).toHaveBeenCalledWith(mockUsersData[0]._id);
  });

  it('renders the correct number of rows', () => {
    render(<RoleTable usersData={mockUsersData} handleDelete={mockHandleDelete} />);
    
    const rows = screen.getAllByRole('row');

    expect(rows.length).toBe(mockUsersData.length + 1);
  });

  it('renders empty table when no data is provided', () => {
    render(<RoleTable usersData={[]} handleDelete={mockHandleDelete} />);
    
    const rows = screen.getAllByRole('row');

    expect(rows.length).toBe(1);
  });

  it('has the correct test id', () => {
    render(<RoleTable usersData={mockUsersData} handleDelete={mockHandleDelete} />);
    
    expect(screen.getByTestId('user-table')).toBeInTheDocument();
  });
});