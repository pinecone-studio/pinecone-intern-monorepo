import { HotelDetailsAmenities, mockAmenities } from '@/components/main/assets/HotelamenitiesMock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('HotelDetail Mock Amenities', () => {
  it('should render the amenities correctly when amenities are available', () => {
    render(<HotelDetailsAmenities amenities={mockAmenities} />);

    // Check if each amenity is rendered
    mockAmenities.forEach((amenity) => {
      expect(screen.getByText(amenity.name))
    });
  });

  it('should render a message when no amenities are available', () => {
    render(<HotelDetailsAmenities amenities={[]} />);

    // Check if the "No amenities available" message is rendered
    expect(screen.getByText('No amenities available.'))
  });
});
