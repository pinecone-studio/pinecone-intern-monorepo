import { HotelDetailsMock } from '@/components/main/assets/HotelDetailsMock';
import { HotelDetailsMock1 } from '@/components/main/assets/HotelDetailsMock1';
import { HotelDetailsMock2 } from '@/components/main/assets/HotelDetailsMock2';
import { HotelDetailsMock3 } from '@/components/main/assets/HotelDetailsMock3';
import { HotelDetailsMock4 } from '@/components/main/assets/HotelDetailsMock4';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main BookingDetails', () => {
  it('should render the main booking Details', () => {
    render(<HotelDetailsMock1 />);
  });
  it('should render the main booking Details', () => {
    render(<HotelDetailsMock2 />);
  });
  it('should render the main booking Details', () => {
    render(<HotelDetailsMock3 />);
  });
  it('should render the main booking Details', () => {
    render(<HotelDetailsMock4 />);
  });
  it('should render the main booking Details', () => {
    render(<HotelDetailsMock />);
  });
});
