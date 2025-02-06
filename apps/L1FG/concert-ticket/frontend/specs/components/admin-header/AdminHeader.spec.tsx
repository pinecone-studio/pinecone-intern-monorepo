import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminHeader } from '../../../src/components/header/AdminHeader'; //

describe('AdminHeader', () => {
  it('renders the logo text', () => {
    render(<AdminHeader />);
    const logoText = screen.getByText('TICKET BOOKING');
    expect(logoText).toBeInTheDocument();
  });

  it('renders the user icon', () => {
    render(<AdminHeader />);
    const userIcon = screen.getByTestId('user-icon');
    expect(userIcon).toBeInTheDocument();
  });

  it('has correct styling for logo container', () => {
    render(<AdminHeader />);
    const logoContainer = screen.getByText('TICKET BOOKING').parentElement;
    expect(logoContainer).toHaveClass('flex items-center justify-center gap-1');
  });

  it('has correct styling for logo dot', () => {
    render(<AdminHeader />);
    const logoDot = screen.getByTestId('logo-dot');
    expect(logoDot).toHaveClass('w-[20px] h-[20px] border rounded-full bg-[#00B7F4]');
  });

  it('has correct styling for user icon', () => {
    render(<AdminHeader />);
    const userIcon = screen.getByTestId('user-icon');
    expect(userIcon).toHaveClass('w-[36px] h-[36px] border rounded-full bg-red-900');
  });
});
