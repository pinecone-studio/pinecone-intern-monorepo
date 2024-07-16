import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleTable from '../../src/app/login-role/components/RoleTable';

describe('RoleTable Component', () => {
  test('renders table headers correctly', () => {
    render(<RoleTable />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Roles')).toBeInTheDocument();
    expect(screen.getAllByText('Email')).toBeInTheDocument();
  });
});
