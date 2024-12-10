import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useAdmin } from '@/components/providers/AdminProvider';
import { HotelDetailsGeneralInfo } from '@/components/admin/assets/hotel-details';

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('HotelDetailsGeneralInfo Component', () => {
  const mockAdminProvider = {
    addHotelForm: {
      values: {
        name: '',
        phone: '',
        stars: 0,
        rating: 0,
        description: '',
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      errors: {},
      touched: {},
    },
    showError: jest.fn((field, errors, touched) => touched[field] && errors[field]),
  };
  beforeEach(() => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);
  });
  it('renders correctly with data', () => {
    mockAdminProvider.addHotelForm.values = {
      name: 'Hotel Sunrise',
      phone: '+123456789',
      stars: 4,
      rating: 8,
      description: 'A beautiful hotel by the beach.',
    };

    render(<HotelDetailsGeneralInfo />);
  });

  it('renders fallback values when data is missing', () => {
    mockAdminProvider.addHotelForm.values = {
      name: '',
      phone: '',
      stars: 0,
      rating: 0,
      description: '',
    };

    render(<HotelDetailsGeneralInfo />);
  });
});
