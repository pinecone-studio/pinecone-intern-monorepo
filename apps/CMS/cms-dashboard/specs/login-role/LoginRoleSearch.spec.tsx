import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginRoleSearch from '../../src/app/login-role/components/LoginRoleSearch';

describe('LoginRoleSearch Component', () => {
  test('renders Users heading and Search input', () => {
    render(<LoginRoleSearch />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Users')).toHaveClass('text-[18px]', 'font-semibold');

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});
