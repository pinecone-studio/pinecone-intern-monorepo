import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuButtons } from '@/components/Home/leftSideBar/MenuButtonsSideBar';
import { MockedProvider } from '@apollo/client/testing';

const mockPush = jest.fn();

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
    expect(menuButton).toHaveClass('w-[300px]');

    // Click to open
    fireEvent.click(notificationButton);
    expect(menuButton).toHaveClass('w-[80px]');

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
    expect(menuButton).toHaveClass('w-[300px]');

    // Click to open
    fireEvent.click(searchSheetButton);
    expect(menuButton).toHaveClass('w-[80px]');

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
    expect(mockPush).toHaveBeenCalledWith('/home');
  });
});
