import { render } from '@testing-library/react';
import { UserHistory } from '@/components/maincomponents/UserHistory';
import { useGetBookingByUserIdQuery, useGetMeQuery, useUpdateBookingEverythingMutation } from '@/generated';

jest.mock('@/generated', () => ({
  useGetBookingByUserIdQuery: jest.fn(),
  useGetMeQuery: jest.fn(),
  useUpdateBookingEverythingMutation: jest.fn(),
}));

const mockBookingData = {
  getBookingByUserId: [
    {
      _id: 'booking1',
      createdAt: '2024-11-01T00:00:00Z',
      status: 'Confirmed',
      amountTotal: 500000,
      eventId: {
        name: 'Rock Concert',
      },
      venues: [
        { name: 'Энгийн', price: 100000, quantity: undefined },
        { name: 'Fanzone', price: undefined, quantity: 100 },
        { name: 'Vip', price: 50000, quantity: 100 },
        { name: undefined, price: 50000, quantity: 100 },
      ],
    },
  ],
};

const mockUserData = {
  getMe: {
    _id: '1',
  },
};

describe('UserHistory', () => {
  beforeEach(() => {
    (useGetBookingByUserIdQuery as jest.Mock).mockReturnValue({
      data: mockBookingData,
      loading: false,
      error: null,
    });
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
      loading: false,
      error: null,
    });
    (useUpdateBookingEverythingMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: false }]);
  });

  it('should render successfully', async () => {
    render(<UserHistory />);
  });

  it('should handle empty venues gracefully', async () => {
    (useGetBookingByUserIdQuery as jest.Mock).mockReturnValueOnce({
      data: {
        getBookingByUserId: [
          {
            _id: 'booking2',
            createdAt: '2024-11-02T00:00:00Z',
            status: 'Pending',
            amountTotal: 0,
            eventId: {
              name: 'Jazz Night',
            },
            venues: [],
          },
        ],
      },
      loading: false,
      error: null,
    });

    render(<UserHistory />);
  });
});
