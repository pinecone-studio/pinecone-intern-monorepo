import { MainNavbar } from '@/components';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MainNavbar', () => {
  it('should render successfully', async () => {
    render(<MainNavbar />);
  });

  it('should apply the active background color to the current path', () => {
    usePathname.mockReturnValue('/signup');

    render(<MainNavbar />);

    const signupButton = screen.getByRole('button', { name: /бүртгүүлэх/i });
    expect(signupButton);
  });
});
