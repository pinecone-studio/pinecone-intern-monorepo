'use client';
import AdminSideBar from '@/app/(admin)/_features/AdminSideBar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AdminSideBar', () => {
  it('renders sidebar correctly', () => {
    useRouter.mockReturnValue('/(admin)/hotels');
    render(<AdminSideBar />);
    expect(screen.getByText('Pedia')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Guests')).toBeInTheDocument();
  });

  it('navigates to /hotels when Hotels button is clicked', async () => {
    render(<AdminSideBar />);
  });

  it('navigates to /guests when Guests button is clicked', async () => {
    render(<AdminSideBar />);
  });
});
