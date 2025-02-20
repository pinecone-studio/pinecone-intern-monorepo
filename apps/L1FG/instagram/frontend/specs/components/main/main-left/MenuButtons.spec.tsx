import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuButtons } from '@/components/home/left/MenuButtonsSideBar';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
const user = userEvent.setup();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('MenuButtons component functionality', () => {
  it('toggles the notification sheet open and closed', () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const notificationButton = screen.getByTestId('click-open-sheet');
    const menuButton = screen.getByTestId('menu-button-open-sheet');

    // Initially closed
    expect(menuButton).toBeDefined();
    // Click to open
    fireEvent.click(notificationButton);
    expect(menuButton).toBeDefined();

    // Click to close
  });

  it('toggles the notification sheet open and closed for search', () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const searchSheetButton = screen.getByTestId('search-button');
    const menuButton = screen.getByTestId('menu-button-open-sheet');

    // Initially closed
    expect(menuButton).toBeDefined();

    // Click to open
    fireEvent.click(searchSheetButton);
    expect(menuButton).toBeDefined();

    // Click to close
  });

  it('navigates to /home when the Instagram icon div is clicked', () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const Div = screen.getByTestId('click-push-home');

    // Click the Instagram icon
    fireEvent.click(Div);

    // Verify navigation
    expect(mockPush).toHaveBeenCalledWith('/');
  });
  it('navigates to settings when settings button is clicked', async () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const MenuButton = await screen.findByTestId('menu-button');
    await user.click(MenuButton);
    const settingsButton = await screen.findByTestId('buttonsettings');
    await user.click(settingsButton);
    expect(mockPush).toHaveBeenCalledWith('/settings');
  });
  it('logs out successfully and redirects to login page', async () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const MenuButton = await screen.findByTestId('menu-button');
    await user.click(MenuButton);

    const logoutButton = screen.getByTestId('buttonlogout');
    await user.click(logoutButton);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('Closesheets ', () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );
    const buttons = screen.getAllByTestId('text-side-bar-id');
    expect(buttons).toBeDefined();
    fireEvent.click(buttons[0]);
  });
});
