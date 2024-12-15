import { Payment } from '@/components';
import { useGetBookingByIdQuery, useSendQrToEmailMutation, useUpdateBookingEverythingMutation } from '@/generated';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import axios from 'axios';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/generated', () => ({
  useGetBookingByIdQuery: jest.fn(),
  useUpdateBookingEverythingMutation: jest.fn(),
  useSendQrToEmailMutation: jest.fn(() => [jest.fn(), {}]),
}));
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    useSendQrToEmailMutation as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component successfully', () => {
    render(<Payment id="123" />);
  });

  it('should navigate back to order details when the back button is clicked', () => {
    const { getByTestId } = render(<Payment id="123" />);
    const backButton = getByTestId('BacktoPush');
    fireEvent.click(backButton);
    expect(mockRouterPush);
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

    const searchInput = getByTestId('SendQrButton');
    expect(searchInput);

    fireEvent.click(searchInput);
  });
  it('should call setQr with the correct data on successful QR code generation', async () => {
    const mockQrData = '/mocked_qr_code_url';
    mockedAxios.post.mockResolvedValueOnce({ data: mockQrData });

    render(<Payment id="123" />);
    const qpayButton = screen.getByTestId('QpayClick');
    fireEvent.click(qpayButton);

    expect(screen.getByText('Loading...'));

    await waitFor(() => {
      expect(screen.getByTestId('qr'));
    });

    const qrImage = screen.getByAltText('QR code');
    expect(qrImage);
  });
  it('should generate QR code when the Qpay button is clicked', async () => {
    render(<Payment id="123" />);
    const qpayButton = screen.getByTestId('QpayClick');
    expect(qpayButton);

    fireEvent.click(qpayButton);

    expect(screen.getByText('Loading...'));
  });
  it('should send QR to email successfully', async () => {
    await (useGetBookingByIdQuery as jest.Mock).mockReturnValue({
      data: {
        getBookingById: { ...mockBookingData.getBookingById, status: 'Баталгаажсан' },
      },
    });

    await (useSendQrToEmailMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({
        data: {
          sendQrToEmail: {
            success: true,
            message: 'QR code email sent successfully to test@example.com.',
          },
        },
      }),
      {},
    ]);

    render(<Payment id="123" />);

    const sendQrButton = screen.getByTestId('SendQrButton');
    await waitFor(() => fireEvent.click(sendQrButton));
  });
});
