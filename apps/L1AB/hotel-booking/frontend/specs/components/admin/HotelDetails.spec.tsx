import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { HotelDetails } from '@/components/admin';
import { useAdmin } from '@/components/providers/AdminProvider';

// Mocking AdminProvider and other dependencies
jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('HotelDetails Component', () => {
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
  it('renders the container and sections', () => {
    render(<HotelDetails />);
  });
});
