import '@testing-library/jest-dom';
import { HotelDetailsGeneralInfo } from '@/components/admin/assets/hotel-details';
import { render } from '@testing-library/react';

describe('Admin Hotel Detatails general Info', () => {
  it('should render the admin hotel details general info', () => {
    render(<HotelDetailsGeneralInfo />);
  });
  it('should render the admin hotel details general info with default values', () => {
    render(<HotelDetailsGeneralInfo name="Hotel Paradise" phone="123-456-7890" desc="A luxurious hotel." rating={9.5} stars={4} />);
  });
});
