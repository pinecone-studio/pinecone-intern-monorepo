import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HotelDetails } from '@/components/admin';
import { useAdmin } from '@/components/providers/AdminProvider';

// Mocking AdminProvider and other dependencies
jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

// Mocking assets used in the HotelDetails component
jest.mock('@/components/admin/assets', () => ({
  DetailsContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsContainer">{children}</div>,
  DetailsLeft: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsLeft">{children}</div>,
  DetailsRight: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsRight">{children}</div>,
  DetailsCard: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsCard">{children}</div>,
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

    // Check if the container and sections are rendered
    expect(screen.getByTestId('DetailsContainer'));
    expect(screen.getByTestId('DetailsLeft'));
    expect(screen.getByTestId('DetailsRight'));

    // Check if each card is rendered
    expect(screen.getAllByTestId('DetailsCard'));

    // Check if each section inside the cards is rendered
    expect(screen.getByTestId('HotelDetailsUpcomingBookings'));
    expect(screen.getByTestId('HotelDetailsRoomTypes'));
    expect(screen.getByTestId('HotelDetailsGeneralInfo'));
    expect(screen.getByTestId('HotelDetailsAmenities'));
    expect(screen.getByTestId('HotelDetailsAboutThisProperty'));
    expect(screen.getByTestId('HotelDetailsPolicies'));
    expect(screen.getByTestId('HotelDetailsPolicies2'));
    expect(screen.getByTestId('HotelDetailsFrequently'));
    expect(screen.getByTestId('HotelDetailsLocation'));
    expect(screen.getByTestId('HotelDetailsImages'));
  });
});
