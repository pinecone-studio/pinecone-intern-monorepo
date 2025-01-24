import { RightNavbar } from '@/components/user/search-result/RightNavbar';
import { render, screen } from '@testing-library/react';

const mockData = [
  {
    id: '1',
    name: 'Hotel 1',
    images: [],
    // Add other properties your `Hotel` type expects
  },
  {
    id: '2',
    name: 'Hotel 2',
    images: [],
    // Add other properties
  },
];

test('renders hotels correctly', () => {
  render(<RightNavbar data={mockData} />);

  expect(screen.findByText('Hotel 1'));
  expect(screen.findByText('Hotel 2'));
});
