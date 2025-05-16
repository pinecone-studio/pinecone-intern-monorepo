import { RoomPriceDetail } from '@/app/(admin)/guest-info/_components/RoomPriceDetail';
import { GuestInfo } from '@/app/(admin)/guest-info/_feature/GuestDetail';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img alt={props.alt || 'mock-image'} {...props} />;
  },
}));

describe('Room price detail', () => {
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

  const totalPrice = 162000;
  it('renders room type and view button', () => {
    render(<RoomPriceDetail totalPrice={totalPrice} guestInfo={mockGuestInfo} />);
    expect(screen.getByText('Economy Single Room')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  it('renders price details correctly', () => {
    render(<RoomPriceDetail guestInfo={mockGuestInfo} totalPrice={totalPrice} />);
    expect(screen.getByText('1 night')).toBeInTheDocument();
    expect(screen.getByText('150,000₮ per night')).toBeInTheDocument();
    expect(screen.getByText('150,000₮')).toBeInTheDocument();
    expect(screen.getByText('Taxes')).toBeInTheDocument();
    expect(screen.getByText('12,000₮')).toBeInTheDocument();
    expect(screen.getByText('Total price')).toBeInTheDocument();
    expect(screen.getByText('162,000₮')).toBeInTheDocument();
  });

  it('renders room image with correct alt text', () => {
    render(<RoomPriceDetail guestInfo={mockGuestInfo} totalPrice={totalPrice} />);
    const image = screen.getByAltText('Room');
    expect(image).toBeInTheDocument();
  });

  it('renders room image with correct alt text', () => {
    render(<RoomPriceDetail guestInfo={{ ...mockGuestInfo, roomImage: '' }} totalPrice={totalPrice} />);
    const image = screen.getByAltText('Room');
    expect(image).toBeInTheDocument();
  });
});
