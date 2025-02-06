// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';

// import { useGetBookingsQuery } from '@/generated';
// import { UpcomingBooking } from '@/components/admin/add-room';

// jest.mock('@/generated', () => ({
//   useGetBookingsQuery: jest.fn(),
// }));

// describe('UpcomingBooking Component', () => {
//   test('renders UpcomingBooking with data', () => {
//     useGetBookingsQuery.mockReturnValue({
//       data: {
//         getBookings: [
//           {
//             id: '1',
//             userId: '123',
//             hotelId: '456',
//             roomId: '789',
//             startDate: '2025-01-01',
//             endDate: '2025-01-05',
//             phoneNumber: '1234567890',
//             guestRequest: 'Extra pillows',
//             email: 'test@example.com',
//             status: 'Confirmed',
//             cardName: 'John Doe',
//             cardNumber: '**** **** **** 1234',
//             expirationDate: '12/25',
//             securityCode: '123',
//             country: 'USA',
//           },
//         ],
//       },
//     });

//     render(<UpcomingBooking />);

//     expect(screen.getByText('Upcoming Bookings')).toBeInTheDocument();
//     expect(screen.getByText('Confirmed')).toBeInTheDocument();
//   });

//   test('renders UpcomingBooking with no data', () => {
//     useGetBookingsQuery.mockReturnValue({ data: { getBookings: [] } });
//     render(<UpcomingBooking />);

//     expect(screen.getByText('Upcoming Bookings')).toBeInTheDocument();
//   });
// });

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingBooking } from '@/components/admin/add-room';

describe('GeneralInfo Component', () => {
  it('renders GeneralInfo successfully', () => {
    render(<UpcomingBooking />);
  });
});
