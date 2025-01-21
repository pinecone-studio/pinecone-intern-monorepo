import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuButtons } from '@/components/Home/leftSideBar/MenuButtonsSideBar';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('MenuButtons component functionality', () => {
  it('toggles the notification sheet open and closed', () => {
    render(<MenuButtons />);

    const notificationButton = screen.getByTestId('click-open-sheet');
    const menuButton = screen.getByTestId('menu-button-open-sheet');

    // Initially closed
    expect(menuButton).toHaveClass('w-[300px]');

    // Click to open
    fireEvent.click(notificationButton);
    expect(menuButton).toHaveClass('w-[80px]');

    // Click to close
    fireEvent.click(notificationButton);
    expect(menuButton).toHaveClass('w-[300px]');
  });

  it('navigates to /home when the Instagram icon div is clicked', () => {
    render(<MenuButtons />);

    const Div = screen.getByTestId('click-push-home');

    // Click the Instagram icon
    fireEvent.click(Div);

    // Verify navigation
    expect(mockPush).toHaveBeenCalledWith('/home');
  });
});
