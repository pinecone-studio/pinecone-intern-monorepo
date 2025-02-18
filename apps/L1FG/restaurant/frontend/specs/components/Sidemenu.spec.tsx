import { Sidemenu } from '@/components/sidemenu/Sidemenu';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Sidemenu', () => {
  let originalLocation: Location;

  beforeEach(() => {
    // Mocking localStorage methods
    Storage.prototype.getItem = jest.fn((key) => (key === 'user' ? 'test-user' : null));
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    // Mocking window.location
    originalLocation = global.location;
    delete global.location;
    global.location = { ...originalLocation, href: '' } as Location;
  });

  afterEach(() => {
    // Restore the original location after each test
    global.location = originalLocation;
  });

  it('logs out successfully and redirects to login page', async () => {
    render(<Sidemenu />);

    // Open the menu
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    });

    // Click the logout button
    fireEvent.click(screen.getByText('Гарах'));

    // Check if localStorage is cleared
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('user');

    // Ensure window.location.href is set to the login page
    await waitFor(() => expect(global.location.href).toBe('/login'));
  });

  it('redirects to login page when user is not logged in', async () => {
    // Simulating a scenario where no user is found
    Storage.prototype.getItem = jest.fn(() => null);

    render(<Sidemenu />);

    // Open the menu
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    });

    // Click the user profile button
    await act(async () => {
      fireEvent.click(screen.getByTestId('userButton'));
    });

    // Ensure window.location.href is set to the login page
    await waitFor(() => expect(global.location.href).toBe('/login'));
  });

  it('redirects to user profile when user is logged in', async () => {
    // Simulating a scenario where a user is logged in
    Storage.prototype.getItem = jest.fn(() => 'user');

    render(<Sidemenu />);

    // Open the menu
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    });

    // Click the user profile button
    await act(async () => {
      fireEvent.click(screen.getByTestId('userButton'));
    });

    // Ensure window.location.href is set to the user profile page
    await waitFor(() => expect(global.location.href).toBe('/userprofile'));
  });
});
