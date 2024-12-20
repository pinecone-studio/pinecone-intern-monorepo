import { BookingDetailRoom } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => <img {...props} src={typeof props.src === 'string' ? props.src : ''} />,
}));

describe('Main BookingDetailRoom', () => {
  it('should render the main BookingDetailRoom', () => {
    const mockProps = {
      hotelDetailName: 'Test Hotel',
      hotelDetailLocation: 'Test Location',
      HotelDetailPhone: '123456789',
      photos: ['/path/to/photo.jpg'],
      rating: 5,
    };

    render(<BookingDetailRoom {...mockProps} />);
  });
});
