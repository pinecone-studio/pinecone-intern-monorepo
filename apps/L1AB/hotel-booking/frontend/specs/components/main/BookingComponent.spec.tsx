import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetBookingByIdDocument } from '@/generated';
import { BookingComponent } from '@/components/main/BookingComponent';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const getBookingByIdMock: MockedResponse = {
  request: {
    query: GetBookingByIdDocument,
    variables: { id: '6756916da16039f4108550f4' },
  },
  result: {
    data: {
      getBookingById: [
        {
          _id: '1',
          status: 'booked',
          checkIn: 'Sunday, December 8, 8:00 AM',
          checkOut: 'Monday, December 9, 8:00 AM',
          traveller: 2,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
          roomId: [
            { photos: 'https://example.com/image1.jpg', description: 'single room', roomType: 'ONE' },
            { photos: 'https://example.com/image2.jpg', description: 'double room', roomType: 'TWO' },
          ],
          hotelId: [{ _id: '2', name: 'Shangri La' }],
        },
      ],
    },
  },
};

describe('Main Booking Component', () => {
  it('should render Bookings successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getBookingByIdMock]} addTypename={false}>
        <BookingComponent />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('confirmedData-0'));
      expect(screen);
    });
  });
});

// query GetBookingById($id: ID!) {
//   getBookingById(_id: $id) {
//     _id
//     roomId {
//       _id
//       name
//       roomNumber
//       price
//       description
//       photos
//       roomType
//       createdAt
//       updatedAt
//       hotelId {
//         _id
//         name
//         description
//         images
//         address
//         phone
//         city
//         rating
//         stars
//         createdAt
//         updatedAt
//       }
//     }
//     firstName
//     lastName
//     email
//     phoneNumber
//     status
//     checkIn
//     checkOut
//     traveller
//     createdAt
//     updatedAt
//   }
// }
