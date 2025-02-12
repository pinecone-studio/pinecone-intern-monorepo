import React from 'react';
import { render, screen } from '@testing-library/react';
import { Amenities } from '@/components/admin/add-hotel';
import { AmenitiesDialog } from '@/components/admin/ui/dialog';
import '@testing-library/jest-dom';

// Mock the AmenitiesDialog component
jest.mock('@/components/admin/ui/dialog', () => ({
  AmenitiesDialog: jest.fn(() => <div>Mocked AmenitiesDialog</div>),
}));

describe('Amenities Component', () => {
  const mockAmenities = ['Wi-Fi', 'Pool', 'Gym'];
  const mockSetAmenities = jest.fn();
  const mockHandleEditHotelAmenities = jest.fn();

  const renderComponent = (amenities = mockAmenities) => {
    return render(<Amenities amenities={amenities} setAmenities={mockSetAmenities} handleEditHotelAmenities={mockHandleEditHotelAmenities} />);
  };

  it('renders the component correctly', () => {
    renderComponent();
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('Mocked AmenitiesDialog')).toBeInTheDocument();
  });

  it('displays the list of amenities', () => {
    renderComponent();
    mockAmenities.forEach((amenity) => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it('displays "-/-" when there are no amenities', () => {
    renderComponent([]);
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it('renders the correct number of amenity tags', () => {
    renderComponent();
    const amenityTags = screen.getAllByRole('listitem'); // Assuming each amenity is rendered as a list item
    expect(amenityTags.length).toBe(mockAmenities.length);
  });

  it('renders the AmenitiesDialog component with the correct props', () => {
    renderComponent();
    expect(AmenitiesDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        amenities: mockAmenities,
        setAmenities: mockSetAmenities,
        handleEditHotelAmenities: mockHandleEditHotelAmenities,
      }),
      expect.anything()
    );
  });
});
