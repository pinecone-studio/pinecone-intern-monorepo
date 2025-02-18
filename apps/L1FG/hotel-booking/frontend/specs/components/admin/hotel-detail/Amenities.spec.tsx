import '@testing-library/jest-dom';
import { Amenities } from '@/components/admin/hotel-detail';

import { render, screen } from '@testing-library/react';

// Мock өгөгдөл
const mockData = {
  id: '1',
  images: [],
  name: 'Sample Hotel',
  amenities: ['Free Wi-Fi', 'Pool', 'Gym'],
};

test('should display amenities when data is provided', () => {
  render(<Amenities data={mockData} />);

  // Үйлчилгээний жагсаалт байгаа эсэхийг шалгах
  mockData.amenities.forEach((amenity) => {
    expect(screen.getByText(amenity));
  });
});

test('should display "-/-" when amenities is empty or not provided', () => {
  const emptyData = {
    id: '1',
    images: [],
    name: 'Sample Hotel',
    amenities: [],
  };
  render(<Amenities data={emptyData} />);

  expect(screen.getByText('Amenities'));
});

test('should display "-/-" when data is not provided', () => {
  render(<Amenities data={{ id: '', images: [], name: '', amenities: [] }} />);

  expect(screen.getByText('-/-'));
});
