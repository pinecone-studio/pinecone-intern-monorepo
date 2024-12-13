import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsImages } from '@/components/admin/assets/hotel-details';
import { useAdmin } from '@/components/providers/AdminProvider';

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('Admin Hotel Details Images', () => {
  it('should render the admin hotel details images', () => {
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: { images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] },
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        errors: {},
        touched: {},
      },
      showError: jest.fn().mockReturnValue(false),
    });
    render(<HotelDetailsImages />);
  });
});
