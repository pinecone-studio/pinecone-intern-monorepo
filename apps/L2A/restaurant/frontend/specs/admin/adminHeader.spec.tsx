import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminHeader from '@/app/admin/_components/Header';
import '@testing-library/jest-dom';

describe('AdminHeader', () => {
  beforeEach(() => {
    render(<AdminHeader />);
  });

  it('renders the header container', () => {
    expect(screen.getByTestId('admin-header')).toBeInTheDocument();
  });

 

  it('always renders the fallback initials', () => {
    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveTextContent('CN');
  });
});
 