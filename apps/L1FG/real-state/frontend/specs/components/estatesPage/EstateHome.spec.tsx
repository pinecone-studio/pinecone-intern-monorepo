import { render, screen } from '@testing-library/react';
import { Post } from '@/generated';
import { Estates } from '@/components/estatesPage/EstatePage';

describe('Estates Component', () => {
  const mockData: Post[] = [
    {
      _id: '1',
      title: 'Post 1',
      price: 1000,
      createdAt: '2023-01-01',
      propertyDetail: { images: ['https://www.example.com'], location: { address: 'ss' } },
    },
    {
      _id: '2',
      title: 'Post 2',
      price: 2000,
      createdAt: '2023-01-02',
      propertyDetail: { images: ['https://www.example.com'], location: { address: 'ss' } },
    },
    {
      _id: '3',
      title: 'Post 3',
      price: 3000,
      createdAt: '2023-01-03',
      propertyDetail: { images: ['https://www.example.com'], location: { address: 'ss' } },
    },
  ];

  it('renders the correct number of MainCard components', () => {
    render(<Estates data={mockData} />);
  });

  it('renders no MainCard components when data is undefined', () => {
    render(<Estates data={undefined} />);
    expect(screen.queryAllByTestId('main-card')).toHaveLength(0);
  });
});
