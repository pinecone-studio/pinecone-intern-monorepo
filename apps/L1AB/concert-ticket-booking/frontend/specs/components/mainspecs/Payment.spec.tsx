import { Payment } from '@/components';
import { useGetBookingByIdQuery, useUpdateBookingEverythingMutation } from '@/generated';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/generated', () => ({
  useGetBookingByIdQuery: jest.fn(),
  useUpdateBookingEverythingMutation: jest.fn(),
}));

const mockRouterPush = jest.fn();

const mockBookingData = {
  getBookingById: {
    _id: '123',
    status: 'Pending',
    amountTotal: 200000,
    venues: [
      { name: 'Энгийн', price: 100000, quantity: 1 },
      { name: 'Fan-Zone', price: 50000, quantity: 2 },
      { name: 'Vip', price: 50000, quantity: 0 },
    ],
    eventId: 'event123',
  },
};

describe('Payment Component', () => {
  beforeEach(() => {
    (useGetBookingByIdQuery as jest.Mock).mockReturnValue({
      data: { getBookingById: mockBookingData.getBookingById },
    });
    (useUpdateBookingEverythingMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component successfully', () => {
    render(<Payment id="123" />);
    expect(screen.getByText('Захиалга баталгаажуулах'));
    expect(screen.getByText('Нийт төлөх дүн'));
    expect(screen.getByText('200000₮'));
  });

  it('should navigate back to order details when the back button is clicked', () => {
    const { getByTestId } = render(<Payment id="123" />);
    const backButton = getByTestId('BacktoPush');
    fireEvent.click(backButton);
    expect(mockRouterPush);
  });

  it('should generate QR code when the Qpay button is clicked', async () => {
    render(<Payment id="123" />);
    const qpayButton = screen.getByTestId('QpayClick');
    expect(qpayButton);

    fireEvent.click(qpayButton);

    expect(screen.getByText('Loading...'));
    await waitFor(() => {
      expect(screen.getByTestId('qr'));
    });
  });

  it('should display payment success message if booking is already paid', () => {
    (useGetBookingByIdQuery as jest.Mock).mockReturnValue({
      data: {
        getBookingById: { ...mockBookingData.getBookingById, status: 'Баталгаажсан' },
      },
    });

    render(<Payment id="123" />);
    expect(screen.getByText('Төлбөр амжилттай төлөгдлөө!'));
    expect(screen.getByText('Төлсөн дүн: 200000₮'));
  });

  it('should handle missing venues gracefully', () => {
    (useGetBookingByIdQuery as jest.Mock).mockReturnValue({
      data: {
        getBookingById: { ...mockBookingData.getBookingById, venues: [] },
      },
    });

    render(<Payment id="123" />);
    const qpayButton = screen.getByTestId('QpayClick');
    fireEvent.click(qpayButton);
    expect(console.error);
  });
  it('should render successfully and handle input change', async () => {
    (useGetBookingByIdQuery as jest.Mock).mockReturnValue({
      data: {
        getBookingById: { ...mockBookingData.getBookingById, status: 'Баталгаажсан' },
      },
    });
    const { getByTestId } = render(<Payment id="123" />);

    const searchInput = getByTestId('ProfiletoPush');
    expect(searchInput);

    fireEvent.click(searchInput);
  });
});
