import { GuestInfoCard } from '@/app/(admin)/guest-info/_components/GuestInfoCard';
import { GuestInfo } from '@/app/(admin)/guest-info/_feature/GuestDetail';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Guest info card', () => {
  it('renders all guest info correctly', () => {
    const mockGuestInfo: GuestInfo = {
      firstName: 'Shagai',
      lastName: 'Nyamdorj',
      status: 'Booked',
      checkIn: 'Oct 20, Monday, Jul 1, 3:00pm',
      checkOut: 'Oct 21, Tuesday, Jul 3, 11:00am',
      email: 'n.shagai@pinecone.mn',
      phoneNumber: '+976 99112233',
      guestRequest: 'No Request',
      roomNumber: 'Room #502',
      adults: 1,
      children: 0,
      roomType: 'Economy Single Room',
      roomImage: '/hotel.png',
      pricePerNight: 150000,
      nights: 1,
      taxes: 12000,
      currency: '₮',
    };

    render(<GuestInfoCard guestInfo={mockGuestInfo} />);

    expect(screen.getByText('Guest Info')).toBeInTheDocument();
    expect(screen.getByText('First name')).toBeInTheDocument();
  });
});
