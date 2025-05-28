import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';
import Sidebar from '@/app/_components/Sidebar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Sidebar component', () => {
  it('renders Profile and Image buttons', () => {
    (usePathname as jest.Mock).mockReturnValue('/edit-profile/profile');

    render(<Sidebar />);

    const profileButton = screen.getByRole('button', { name: 'Profile' });
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).toHaveClass('bg-[#F4F4F5]');

    const imageButton = screen.getByRole('button', { name: 'Image' });
    expect(imageButton).toBeInTheDocument();
    expect(imageButton).toHaveClass('bg-white');
  });

  it('highlights the Image button when pathname is /edit-profile/profile-image', () => {
    (usePathname as jest.Mock).mockReturnValue('/edit-profile/profile-image');

    render(<Sidebar />);

    const profileButton = screen.getByRole('button', { name: 'Profile' });
    expect(profileButton).toHaveClass('bg-white');

    const imageButton = screen.getByRole('button', { name: 'Image' });
    expect(imageButton).toHaveClass('bg-[#F4F4F5]');
  });
});
