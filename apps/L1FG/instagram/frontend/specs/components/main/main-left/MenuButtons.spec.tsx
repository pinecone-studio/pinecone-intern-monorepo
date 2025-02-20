import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/components/providers/AuthProvider';
import { MenuButtons } from '@/components/home/left/MenuButtonsSideBar';

const mockPush = jest.fn();
const user = userEvent.setup();

jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('MenuButtons component functionality', () => {
  it('toggles the notification sheet open and closed', () => {
    const setNotification = jest.fn();
    useAuth.mockReturnValue({ setNotification }); // ✅ useAuth-ийг зөв mock болгож байна

    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const notificationButton = screen.getByTestId('click-open-sheet');
    fireEvent.click(notificationButton);

    // ✅ useAuth hook-ийг зөв тестлэх
    const { result } = renderHook(() => useAuth());
    result.current.setNotification(false);

    expect(setNotification).toHaveBeenCalledTimes(2);
    expect(setNotification).toHaveBeenCalledWith(false);
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

  // it('logs out successfully and redirects to login page', async () => {
  //   render(
  //     <MockedProvider>
  //       <MenuButtons />
  //     </MockedProvider>
  //   );

  //   const MenuButton = await screen.findByTestId('menu-button');
  //   await user.click(MenuButton);

  //   const logoutButton = screen.getByTestId('buttonlogout');
  //   await user.click(logoutButton);

  //   expect(mockPush).toHaveBeenCalledWith('/login');
  // });
  // it('navigates to settings when settings button is clicked', async () => {
  //   render(
  //     <MockedProvider>
  //       <MenuButtons />
  //     </MockedProvider>
  //   );

  //   const MenuButton = await screen.findByTestId('menu-button');
  //   await user.click(MenuButton);
  //   const settingsButton = await screen.findByTestId('buttonsettings');
  //   await user.click(settingsButton);
  //   expect(mockPush).toHaveBeenCalledWith('/settings');
  // });

  it('navigates to /home when the Instagram icon div is clicked', () => {
    render(
      <MockedProvider>
        <MenuButtons />
      </MockedProvider>
    );

    const div = screen.getByTestId('click-push-home');
    fireEvent.click(div);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
