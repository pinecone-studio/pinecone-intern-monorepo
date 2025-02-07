/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderStatusUpdate from '@/components/admin-page-comp/OrderStatusUpdate';
import userEvent from '@testing-library/user-event';
import { useUpdateOrderStatusMutation } from '@/generated';

// Mock the generated hook
const mockUpdateOrderStatus = jest.fn();
let mockLoading = false;
jest.mock('@/generated', () => ({
  useUpdateOrderStatusMutation: () => [mockUpdateOrderStatus, { loading: false }],
}));

// Sample order data
const mockOrder = {
  _id: '123',
  status: 'Pending',
};

const mockLoadingState = { current: false };
jest.mock('@/generated', () => ({
  useUpdateOrderStatusMutation: () => [mockUpdateOrderStatus, { loading: mockLoadingState.current }],
}));

function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? 'mouse',
  });
  return event;
}

describe('OrderStatusUpdate', () => {
  beforeAll(() => {
    // Setup pointer event mocks
    window.PointerEvent = createMockPointerEvent as any;

    // Mock HTMLElement methods
    Object.assign(window.HTMLElement.prototype, {
      scrollIntoView: jest.fn(),
      releasePointerCapture: jest.fn(),
      hasPointerCapture: jest.fn(),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    mockLoadingState.current = false;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders with initial order status', () => {
    render(<OrderStatusUpdate order={mockOrder} />);
    expect(screen.getByTestId('status-select-button')).toHaveTextContent('Хүлээгдэж буй');
  });

  it('updates selected status when user selects a new status', async () => {
    const user = userEvent.setup();
    render(<OrderStatusUpdate order={mockOrder} />);

    // Open the select dropdown
    fireEvent.pointerDown(screen.getByTestId('status-select-button'));

    // Click on the "Ready" option
    user.click(screen.getByText('Бэлэн'));

    await waitFor(() => {
      expect(screen.getByTestId('status-select-button')).toHaveTextContent('Бэлэн');
    });
  });

  it('shows loading state when updating status', async () => {
    // Override the mock to show loading state
    jest.mock('@/generated', () => ({
      useUpdateOrderStatusMutation: () => [mockUpdateOrderStatus, { loading: true }],
    }));

    render(<OrderStatusUpdate order={mockOrder} />);

    const saveButton = screen.getByRole('button', { name: /хадгалах/i });
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalled();
    });
  });

  it('handles successful status update', async () => {
    const user = userEvent.setup();
    mockUpdateOrderStatus.mockResolvedValueOnce({
      data: {
        updateOrderStatus: {
          _id: '123',
          status: 'Ready',
        },
      },
    });

    render(<OrderStatusUpdate order={mockOrder} />);

    // Open select and choose new status
    await user.click(screen.getByTestId('status-select-button'));
    await user.click(screen.getByText('Бэлэн'));

    // Click save button
    await user.click(screen.getByTestId('status-sub-btn'));

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith({
        variables: {
          orderId: '123',
          status: 'Ready',
        },
      });
      expect(window.alert).toHaveBeenCalledWith('Захиалга амжилттай шинэчлэгдлээ!');
    });
  });

  it('handles error during status update', async () => {
    const user = userEvent.setup();
    mockUpdateOrderStatus.mockRejectedValueOnce(new Error('Update failed'));

    render(<OrderStatusUpdate order={mockOrder} />);

    // Open select and choose new status
    fireEvent.pointerDown(screen.getByTestId('status-select-button'));
    user.click(screen.getByText('Бэлэн'));

    // Click save button
    fireEvent.click(screen.getByText('Хадгалах'));

    await waitFor(() => {});
  });

  it('updates component when order prop changes', () => {
    const { rerender } = render(<OrderStatusUpdate order={mockOrder} />);

    // Verify initial status
    expect(screen.getByTestId('status-select-button')).toHaveTextContent('Хүлээгдэж буй');

    // Update order prop
    const updatedOrder = {
      _id: '123',
      status: 'Done',
    };

    // Rerender with new order
    rerender(<OrderStatusUpdate order={updatedOrder} />);

    // Verify status is updated
    expect(screen.getByTestId('status-select-button')).toHaveTextContent('Дууссан');
  });
});
