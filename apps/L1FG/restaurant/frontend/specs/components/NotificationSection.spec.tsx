import { render } from '@testing-library/react';
import NotificationSection from '@/components/NotificationSection';
import { useGetOrdersForUserQuery } from '@/generated';
import { toast } from 'sonner';
import { MockedProvider } from '@apollo/client/testing';

// Mock GraphQL hooks and localStorage
jest.mock('@/generated', () => ({
  useGetOrdersForUserQuery: jest.fn(),
  useUpdateOrderReadMutation: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock localStorage
beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify({ _id: 'user123' }));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('NotificationSection', () => {
  // Mock data for orders
  const mockOrders = [
    {
      _id: 'order1',
      status: 'Pending',
      userId: 'user123',
      isRead: false,
      createdAt: new Date('2025-02-18T08:30:00Z').toISOString(),
    },
    {
      _id: 'order2',
      status: 'Ready',
      isRead: true,
      createdAt: new Date('2025-02-17T12:45:00Z').toISOString(),
    },
    {
      _id: 'order3',
      status: 'InProcess',
      isRead: false,
      createdAt: new Date('2025-02-19T14:20:00Z').toISOString(),
    },
    {
      _id: 'order4',
      status: 'Done',
      isRead: true,
      createdAt: new Date('2025-02-16T10:00:00Z').toISOString(),
    },
  ];

  // Mock response for useGetOrdersForUserQuery
  useGetOrdersForUserQuery.mockReturnValue({
    data: {
      getOrdersForUser: mockOrders,
    },
    loading: false,
    error: null,
  });

  // Mock response for useUpdateOrderReadMutation
  // fireEvent.click(screen.getByTestId('order0'));
  // useUpdateOrderReadMutation.mockReturnValue([
  //   jest.fn().mockResolvedValue({
  //     data: {
  //       updateOrderRead: [
  //         {
  //           _id: 'order1',
  //           status: 'Pending',
  //           isRead: true, // Marked as read
  //           createdAt: new Date('2025-02-18T08:30:00Z').toISOString(),
  //         },
  //         ...mockOrders.slice(1),
  //       ],
  //     },
  //   }),
  // ]);

  // it('should render notifications and handle click event', async () => {
  //   // Render the NotificationSection
  //   render(<NotificationSection />);

  //   screen.getByTestId('notification-button');

  //   // Check the unread notification count
  //   screen.getByTestId('unread-count');

  //   // Wait for the update and check if the toast success message is called
  //   await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Notification marked as read'));

  //   // Verify the state is updated (i.e., the notification is marked as read)
  //   expect(screen.queryByTestId('unread-count')).toHaveTextContent('1'); // Now 1 unread order
  // });

  it('handles localStorage get user not found, userId will be null', async () => {
    Storage.prototype.getItem = jest.fn(() => null);
    render(
      <MockedProvider>
        <NotificationSection />
      </MockedProvider>
    );
    expect(toast.error).toHaveBeenCalledWith('Та нэвтэрч орно уу!');
  });

  it('should render loading state while fetching data', () => {
    // Mock loading state for the GraphQL query
    useGetOrdersForUserQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MockedProvider>
        <NotificationSection />
      </MockedProvider>
    );
  });
  // it('should mark a notification as read when clicked', async () => {
  //   const mockUpdateOrderRead = jest.fn().mockResolvedValue({
  //     data: {
  //       updateOrderRead: {
  //         _id: 'order1',
  //         isRead: true,
  //       },
  //     },
  //   });

  //   useUpdateOrderReadMutation.mockReturnValue([mockUpdateOrderRead]);

  //   render(<NotificationSection />);

  //   // Ensure the mutation was called with the correct order ID
  //   await waitFor(() => expect(mockUpdateOrderRead).toHaveBeenCalledWith({ variables: { orderId: 'order1' } }));

  //   // Optionally, check if it updates the UI
  //   await waitFor(() => {
  //     expect(screen.queryByTestId('notification-icon-ring-order1')).not.toBeInTheDocument();
  //     expect(screen.getByTestId('notification-icon-order1')).toBeInTheDocument();
  //   });
  // });
});
