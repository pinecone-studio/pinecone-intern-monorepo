import { Sidemenu } from '@/components/sidemenu/Sidemenu';
import { fireEvent, render, screen } from '@testing-library/react';

// Mocking window.location
const mockLocation = { href: '' };
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Sidemenu', () => {
  it('logs out successfully', async () => {
    // Mock localStorage
    localStorage.setItem('user', 'test-user');

    // Render the Sidemenu component
    render(<Sidemenu />);

    // Open the menu
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    // Click the logout button
    fireEvent.click(screen.getByText('Гарах'));

    // Assertions
    expect(localStorage.getItem('user')).toBeNull(); // user should be removed from localStorage
    expect(window.location.href).toBe('/login'); // location should redirect to /login
  });
});
