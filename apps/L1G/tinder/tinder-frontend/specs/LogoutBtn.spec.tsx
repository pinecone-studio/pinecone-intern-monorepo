import { LogoutBtn } from '@/components/LogoutBtn';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Logout button', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    pushMock.mockReset();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    Storage.prototype.removeItem = jest.fn();
  });

  it('renders the button', () => {
    render(<LogoutBtn />);
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('removes token from localStorage on click', () => {
    render(<LogoutBtn />);
    const button = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(button);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('redirects to home page on click', () => {
    render(<LogoutBtn />);
    const button = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('handles errors gracefully', () => {
    (localStorage.removeItem as jest.Mock).mockImplementation(() => {
      throw new Error('fail');
    });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<LogoutBtn />);
    const button = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });
});
