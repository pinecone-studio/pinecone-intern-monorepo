import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookingDetail } from '@/app/(main)/my-booking/[bookingDetail]/_components/BookingDetail';

jest.mock('next/image', () => {
  const NextImage = ({ src, alt, fill, ...props }: any) => {
    const imgProps = { ...props };
    if (fill) imgProps['data-fill'] = 'true';
    return <img src={src} alt={alt} {...imgProps} />;
  };

  NextImage.displayName = 'NextImage';

  return NextImage;
});

jest.mock('next/link', () => {
  const NextLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return <a href={href}>{children}</a>;
  };

  NextLink.displayName = 'NextLink';

  return NextLink;
});

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, ...props }) => (
    <button className={`${variant} ${className}`} {...props}>
      {children}
    </button>
  ),
}));
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className }) => <span className={className}>{children}</span>,
}));
jest.mock('lucide-react', () => ({ ArrowLeft: () => <span data-testid="arrow-left">←</span> }));

describe('BookingDetail', () => {
  const mockBooking = {
    _id: 'booking123',
    status: 'booked',
    hotelId: {
      name: 'Test Hotel',
      location: 'Ulaanbaatar, Mongolia',
      phone: '12345678',
      rating: '4.5',
      images: ['https://example.com/hotel.jpg'],
    },
    roomId: { type: 'Deluxe Room' },
    userId: { firstName: 'John', lastName: 'Doe' },
    guests: { adults: 2, children: 1 },
  };

  const checkIn = { date: '2024-12-15', time: '14:00' };
  const checkOut = { date: '2024-12-18', time: '11:00' };

  it('renders booking details correctly', () => {
    render(<BookingDetail booking={mockBooking} checkIn={checkIn} checkOut={checkOut} />);

    expect(screen.getAllByText('Test Hotel')).toHaveLength(2);
    expect(screen.getByText('booked')).toBeInTheDocument();
    expect(screen.getByText('2024-12-15, 14:00')).toBeInTheDocument();
    expect(screen.getByText('2024-12-18, 11:00')).toBeInTheDocument();
    expect(screen.getByText('Deluxe Room')).toBeInTheDocument();
    expect(screen.getByText('John Doe, 2 adult, 1 child')).toBeInTheDocument();
  });

  it('shows cancel button for booked status', () => {
    render(<BookingDetail booking={mockBooking} checkIn={checkIn} checkOut={checkOut} />);

    expect(screen.getByText('Cancel booking')).toBeInTheDocument();
    expect(screen.getByText('Contact property')).toBeInTheDocument();
  });

  it('hides cancel button for cancelled status', () => {
    const cancelled = { ...mockBooking, status: 'cancelled' };
    render(<BookingDetail booking={cancelled} checkIn={checkIn} checkOut={checkOut} />);

    expect(screen.queryByText('Cancel booking')).not.toBeInTheDocument();
  });

  it('applies correct badge colors', () => {
    const { rerender } = render(<BookingDetail booking={mockBooking} checkIn={checkIn} checkOut={checkOut} />);
    expect(screen.getByText('booked')).toHaveClass('bg-[#18BA51]');

    const cancelled = { ...mockBooking, status: 'cancelled' };
    rerender(<BookingDetail booking={cancelled} checkIn={checkIn} checkOut={checkOut} />);
    expect(screen.getByText('cancelled')).toHaveClass('bg-[#E11D48]');
  });

  it('renders hotel image with fallback', () => {
    const { rerender } = render(<BookingDetail booking={mockBooking} checkIn={checkIn} checkOut={checkOut} />);
    expect(screen.getByAltText('Hotel room')).toHaveAttribute('src', 'https://example.com/hotel.jpg');

    const noImage = { ...mockBooking, hotelId: { ...mockBooking.hotelId, images: [] } };
    rerender(<BookingDetail booking={noImage} checkIn={checkIn} checkOut={checkOut} />);
    expect(screen.getByAltText('Hotel room')).toHaveAttribute('src', '/placeholder.svg');
  });

  it('handles null booking gracefully', () => {
    render(<BookingDetail booking={null} checkIn={checkIn} checkOut={checkOut} />);
    expect(screen.getByText('2024-12-15, 14:00')).toBeInTheDocument();
  });

  it('renders all required buttons and links', () => {
    render(<BookingDetail booking={mockBooking} checkIn={checkIn} checkOut={checkOut} />);

    expect(screen.getByText('View rules & restrictions')).toBeInTheDocument();
    expect(screen.getByText('Call +976 12345678')).toBeInTheDocument();
    expect(screen.getByText('View in Google Maps')).toBeInTheDocument();
    expect(screen.getByText('Check-in and special instructions')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    render(<BookingDetail booking={mockBooking} checkIn={checkIn} checkOut={checkOut} />);

    const backLink = screen.getByTestId('arrow-left').closest('a');
    expect(backLink).toHaveAttribute('href', '/my-booking');

    const cancelLink = screen.getByText('Cancel booking').closest('a');
    expect(cancelLink).toHaveAttribute('href', '/my-booking/booking123/booking123');
  });
});
