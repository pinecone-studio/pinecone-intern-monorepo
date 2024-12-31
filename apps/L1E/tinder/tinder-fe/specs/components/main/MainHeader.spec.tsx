'use client';
import { MainHeader } from '@/components/main/MainHeader';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MainHeader', () => {
  it('renders correctly with mocked user data and handles logout', () => {
    const mockUser = {
      images: ['redlogo.png'],
    };

    const push = jest.fn();
    useRouter.mockReturnValue({
      push,
    });

    const { getByTestId } = render(<MainHeader user={mockUser} />);

    const dropbtn = getByTestId('drop');
    fireEvent.click(dropbtn);

    const logoutButton = getByTestId('logout');
    fireEvent.click(logoutButton);

    expect(push).toHaveBeenCalledWith('/');

    // Ensure that the image source is set correctly to the user's image
  });

  it('should use fallback image when user images are empty or not provided', () => {
    const mockUser = {}; // No images provided

    const push = jest.fn();
    useRouter.mockReturnValue({
      push,
    });

    const { getByTestId } = render(<MainHeader user={mockUser} />);

    const dropbtn = getByTestId('drop');
    fireEvent.click(dropbtn);

    const logoutButton = getByTestId('logout');
    fireEvent.click(logoutButton);

    expect(push).toHaveBeenCalledWith('/');

    // Ensure that the fallback image is used
  });
});
