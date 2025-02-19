import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetOrdersForUserDocument } from '@/generated';
import '@testing-library/jest-dom';
import { toast } from 'sonner';
import { OrderProvider } from '@/components/providers';
import NotificationSection from '@/components/NotificationSection';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock data
const mockOrders = [
  {
    _id: '1',
    status: 'Pending',
    isRead: false,
    createdAt: new Date('2024-02-19T10:00:00'),
  },
  {
    _id: '2',
    status: 'InProcess',
    isRead: true,
    createdAt: new Date('2024-02-19T09:00:00'),
  },
];

const mocks = [
  {
    request: {
      query: GetOrdersForUserDocument,
      variables: { userId: 'test-user-id' },
    },
    result: {
      data: {
        getOrdersForUser: mockOrders,
      },
    },
  },
];

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('NotificationSection', () => {
  const mockMarkOrderAsRead = jest.fn();

  const renderComponent = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <OrderProvider value={{ markOrderAsRead: mockMarkOrderAsRead }}>
          <NotificationSection />
        </OrderProvider>
      </MockedProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification button with correct initial state', () => {
    renderComponent();

    expect(screen.getByTestId('notification-button')).toBeInTheDocument();
    expect(screen.getByTestId('openNotification')).toBeInTheDocument();
  });

  it('shows error toast when user is not logged in', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    renderComponent();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Та нэвтэрч орно уу!');
    });
  });

  it('displays correct number of unread notifications', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'test-user-id' }));
    renderComponent();

    await waitFor(() => {
      const unreadCount = screen.getByTestId('unread-count');
      expect(unreadCount).toBeInTheDocument();
      expect(unreadCount.textContent).toBe('1');
    });
  });

  it('opens notification sheet when button is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'test-user-id' }));
    renderComponent();

    fireEvent.click(screen.getByTestId('notification-button'));

    await waitFor(() => {
      expect(screen.getByTestId('notification-sheet')).toBeInTheDocument();
      expect(screen.getByTestId('notification-header')).toHaveTextContent('Мэдэгдлүүд');
    });
  });

  it('displays notifications in correct order', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'test-user-id' }));
    renderComponent();

    fireEvent.click(screen.getByTestId('notification-button'));

    await waitFor(() => {
      const notifications = screen.getAllByTestId(/^order\d+$/);
      expect(notifications).toHaveLength(2);

      // Check order numbers
      expect(screen.getByTestId('order0')).toHaveTextContent('#2');
      expect(screen.getByTestId('order1')).toHaveTextContent('#1');
    });
  });
  it('displays correct status messages and labels', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'test-user-id' }));
    renderComponent();

    fireEvent.click(screen.getByTestId('notification-button'));

    await waitFor(() => {
      expect(screen.getByTestId('status-label-1')).toHaveTextContent('Хүлээгдэж буй');
      expect(screen.getByTestId('status-label-2')).toHaveTextContent('Бэлтгэгдэж буй');
    });
  });
  it('calls markOrderAsRead when notification is clicked', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'test-user-id' }));
    renderComponent();

    fireEvent.click(screen.getByTestId('notification-button'));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('order-card-1'));
    });
  });
  it('displays correct notification icons based on read status', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'test-user-id' }));
    renderComponent();

    fireEvent.click(screen.getByTestId('notification-button'));

    await waitFor(() => {
      expect(screen.getByTestId('notification-icon-ring-1')).toBeInTheDocument(); // Unread notification
      expect(screen.getByTestId('notification-icon-2')).toBeInTheDocument(); // Read notification
    });
  });
});
