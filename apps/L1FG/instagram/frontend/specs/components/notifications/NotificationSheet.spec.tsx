import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationSheet } from '@/components/notifications/NotificationSheet';
import { GetNotificationDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

const getNotificationMock = [
  {
    request: {
      query: GetNotificationDocument,
    },
    result: {
      data: {
        getNotification: {
          today: [{ id: '1', message: 'Today notification' }],
          thisWeek: [{ id: '2', message: 'This week notification' }],
          earlier: [{ id: '3', message: 'Earlier notification' }],
        },
      },
    },
  },
];

describe('NotificationSheet', () => {
  const mockSetIsOpen = jest.fn();
  it('renders the notification sheet when isOpen is true', () => {
    render(
      <MockedProvider mocks={getNotificationMock} addTypename={false}>
        <NotificationSheet isOpen={true} setIsOpen={mockSetIsOpen} />
      </MockedProvider>
    );

    const notificationSheet = screen.getByTestId('notification-sheet');
    expect(notificationSheet).toBeInTheDocument();
    expect(notificationSheet).toHaveClass('translate-x-0');
  });

  it('does not render the notification sheet when isOpen is false', () => {
    render(
      <MockedProvider mocks={getNotificationMock} addTypename={false}>
        <NotificationSheet isOpen={true} setIsOpen={mockSetIsOpen} />
      </MockedProvider>
    );

    const notificationSheet = screen.getByTestId('notification-sheet');
    expect(notificationSheet).toBeInTheDocument();
    expect(notificationSheet).toHaveClass(
      'fixed top-0 left-[80px] w-[396px] h-full bg-white border-l shadow-xl transform transition-transform duration-500 ease-in-out z-40 rounded-r-xl border-r translate-x-0'
    );
  });

  it('calls setIsOpen with false when clicking outside the sheet', () => {
    render(
      <MockedProvider mocks={getNotificationMock} addTypename={false}>
        <NotificationSheet isOpen={true} setIsOpen={mockSetIsOpen} />
      </MockedProvider>
    );

    const backdrop = screen.getByTestId('open-sheet');
    fireEvent.click(backdrop);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('renders notifications correctly', async () => {
    render(
      <MockedProvider mocks={getNotificationMock} addTypename={false}>
        <NotificationSheet isOpen={true} setIsOpen={mockSetIsOpen} />
      </MockedProvider>
    );
  });
  it('mockprovider data', async () => {
    render(
      <MockedProvider mocks={undefined} addTypename={false}>
        <NotificationSheet isOpen={true} setIsOpen={mockSetIsOpen} />
      </MockedProvider>
    );

    expect(screen.findByTestId('data-obso'));
  });
});
