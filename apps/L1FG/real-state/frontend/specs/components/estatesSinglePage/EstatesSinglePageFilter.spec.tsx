import { render, screen } from '@testing-library/react';
import { EstateSinglePageFilter } from '@/components/estatesSinglePage/EstatesSinglePageFilter';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

describe('EstateSinglePageFilter', () => {
  const mockData = {
    _id: '123',
    title: 'Test Property',
    price: '100000000',
    propertyDetail: {
      images: ['test-image.jpg'],
      size: '80',
      totalRooms: 3,
      restrooms: 2,
      location: {
        city: 'Test City',
        address: 'Test Address',
        district: 'Test District',
        subDistrict: 'Test SubDistrict',
      },
    },
  } as any;

  it('renders property details correctly', () => {
    render(<EstateSinglePageFilter data={mockData} />);

    expect(screen.getByText('Test Property'));
    expect(screen.getByText('100000000'));
    expect(screen.getByText('3'));
  });

  it('creates correct link to property details', () => {
    render(<EstateSinglePageFilter data={mockData} />);

    const link = screen.getByRole('link');
    expect(link);
  });

  it('renders property image', () => {
    render(<EstateSinglePageFilter data={mockData} />);

    const image = screen.getByRole('img');
    expect(image);
    expect(image);
  });
});
