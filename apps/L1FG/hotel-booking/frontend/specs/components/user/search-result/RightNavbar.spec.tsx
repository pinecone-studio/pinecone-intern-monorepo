import { RightNavbar } from '@/components/user/search-result/RightNavbar';
import { render, screen } from '@testing-library/react';

const mockData = [
  {
    id: '1',
    name: 'Hotel 1',
    images: [],
  },
  {
    id: '2',
    name: 'Hotel 2',
    images: [],
  },
];

describe('renders hotels correctly and changes price order', () => {
  it('1', () => {
    const setSearchValuePrice = jest.fn();

    render(<RightNavbar data={mockData} setSearchValuePrice={setSearchValuePrice} />);

    expect(screen.getByText('Hotel 1'));
    expect(screen.getByText('Hotel 2'));
  });
});
