import { render } from '@testing-library/react';
import { useAdmin } from '@/components/providers/AdminProvider';
import '@testing-library/jest-dom';
import { HotelDetailsLocation } from '@/components/admin/assets/hotel-details';

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

jest.mock('@/components/admin/dialogs', () => ({
  LocationDialog: jest.fn(() => <div>Location Dialog</div>),
}));

describe('HotelDetailsLocation Component', () => {
  it('renders location details correctly', () => {
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: {
          address: '123 Main Street, Cityville',
        },
      },
    });

    render(<HotelDetailsLocation />);
  });

  it('renders a placeholder when address is not provided', () => {
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: {
          address: '',
        },
      },
    });

    render(<HotelDetailsLocation />);
  });
});
