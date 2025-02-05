import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationSheet } from '@/components/notifications/NotificationSheet';

jest.mock('@/components/notifications/Today', () => ({ Today: () => <div data-testid="today">Today</div> }));
jest.mock('@/components/notifications/Yesterday', () => ({ Yesterday: () => <div data-testid="yesterday">Yesterday</div> }));
jest.mock('@/components/notifications/ThisWeek', () => ({ ThisWeek: () => <div data-testid="this-week">This Week</div> }));
jest.mock('@/components/notifications/Earlier', () => ({ Earlier: () => <div data-testid="earlier">Earlier</div> }));

describe('NotificationSheet', () => {
  it('renders the notification sheet when isOpen is true', () => {
    render(<NotificationSheet isOpen={true} setIsOpen={jest.fn()} />);

    const notificationSheet = screen.getByTestId('notification-sheet');
    expect(notificationSheet).toBeInTheDocument();
    expect(notificationSheet).toHaveClass('translate-x-0');
  });

  it('does not render the notification sheet when isOpen is false', () => {
    render(<NotificationSheet isOpen={false} setIsOpen={jest.fn()} />);

    const notificationSheet = screen.getByTestId('notification-sheet');
    expect(notificationSheet).toBeInTheDocument();
    expect(notificationSheet).toHaveClass('-translate-x-full');
  });

  it('calls setIsOpen with false when clicking outside the sheet', () => {
    const mockSetIsOpen = jest.fn();
    render(<NotificationSheet isOpen={true} setIsOpen={mockSetIsOpen} />);

    const backdrop = screen.getByTestId('open-sheet');
    fireEvent.click(backdrop);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('renders child components', () => {
    render(<NotificationSheet isOpen={true} setIsOpen={jest.fn()} />);

    expect(screen.getByTestId('today')).toBeInTheDocument();
    expect(screen.getByTestId('yesterday')).toBeInTheDocument();
    expect(screen.getByTestId('this-week')).toBeInTheDocument();
    expect(screen.getByTestId('earlier')).toBeInTheDocument();
  });
});
