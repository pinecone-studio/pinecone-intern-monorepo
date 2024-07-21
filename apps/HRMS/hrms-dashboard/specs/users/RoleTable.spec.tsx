import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleTable from '../../src/app/users/components/RoleTable';

// Mock the imported components 
jest.mock('@/components/ui/table', () => ({
    Table: ({ children, ...props }) => <table {...props}>{children}</table>,
    TableBody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    TableCaption: ({ children, ...props }) => <caption {...props}>{children}</caption>,
    TableCell: ({ children, ...props }) => <td {...props}>{children}</td>,
    TableFooter: ({ children, ...props }) => <tfoot {...props}>{children}</tfoot>,
    TableHead: ({ children, ...props }) => <th {...props}>{children}</th>,
    TableHeader: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    TableRow: ({ children, ...props }) => <tr {...props}>{children}</tr>,
  }));

  describe('UsersTable', () => {
    const mockUsersData = [
      {
        _id: '66824310ddac218445cef72d',
        firstName: 'Uuree',
        lastName: 'Test',
        email: 'uuree_i4@yahoo.com',
        role: 'ADMIN',
        password: 'Password@',
      },
      {
        _id: '6697d4ac0c800c17be923d1c',
        firstName: 'Test',
        lastName: 'Tset',
        email: 'test@gmail.com',
        role: 'EMPLOYEE',
       password: 'testpass'
      },
    ];
  
    it('renders the UsersTable component correctly', () => {
      render(<RoleTable usersData={mockUsersData} />);
  
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Id')).toBeInTheDocument();
      expect(screen.getByText('Roles')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  
    it('renders user data correctly', () => {
      render(<RoleTable usersData={mockUsersData} />);
  
      mockUsersData.forEach((item) => {
        expect(screen.getByText(item.firstName)).toBeInTheDocument();
        expect(screen.getByText(item._id)).toBeInTheDocument();
        expect(screen.getByText(item.role)).toBeInTheDocument();
        expect(screen.getByText(item.email)).toBeInTheDocument();
      });
    });
  

  
  
    it('renders an empty table when no student data is provided', () => {
      render(<RoleTable usersData={[]} />);
  
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
  
