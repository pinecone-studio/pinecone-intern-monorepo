'use client';
import AdminSideBar from '@/app/(admin)/_components/AdminSideBar';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AdminSideBar', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders sidebar correctly', () => {
    render(<AdminSideBar />);
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Guests')).toBeInTheDocument();
  });

  it('navigates to /hotels when Hotels button is clicked', () => {
    render(<AdminSideBar />);
    const hotelsButton = screen.getByText('Hotels');
    fireEvent.click(hotelsButton);
    expect(hotelsButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/hotels');
  });

  it('navigates to /guests when Guests button is clicked', () => {
    render(<AdminSideBar />);
    const guestsButton = screen.getByText('Guests');
    fireEvent.click(guestsButton);
    expect(guestsButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/guests');
  });
});
