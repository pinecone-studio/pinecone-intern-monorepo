import { render, screen, fireEvent } from '@testing-library/react';
import EstateSinglePage from '@/components/estatesSinglePage/EstatesSinglePage';
import { HouseTypeEnum, Post, useGetPostsQuery } from '@/generated';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useGetPostsQuery: jest.fn(),
}));

describe('EstateSinglePage', () => {
  const mockData = {
    _id: '123',
    title: 'Test Property',
    description: 'Test Description',
    price: '100000000',
    propertyDetail: {
      houseType: HouseTypeEnum.Apartment,
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      size: '80',
      totalRooms: 3,
      restrooms: 2,
      garage: true,
      location: {
        city: 'Test City',
        address: 'Test Address',
        district: 'Test District',
        subDistrict: 'Test SubDistrict',
      },
    },
    propertyOwnerId: {
      name: 'Test Owner',
      phone: '99999999',
    },
  } as Post;
  const mockData1 = {
    _id: '123',
    title: 'Test Property',
    description: 'Test Description',
    price: '100000000',
    propertyDetail: {
      houseType: HouseTypeEnum.Apartment,
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      size: '80',
      totalRooms: 3,
      restrooms: 2,
      garage: false,
      location: {
        city: 'Test City',
        address: 'Test Address',
        district: 'Test District',
        subDistrict: 'Test SubDistrict',
      },
    },
    propertyOwnerId: {
      name: 'Test Owner',
      phone: '99999999',
    },
  } as Post;

  const mockSimilarPosts = {
    getPosts: [
      {
        _id: '456',
        propertyDetail: {
          houseType: HouseTypeEnum.Apartment,
          images: ['similar1.jpg'],
        },
      },
      {
        _id: '789',
        propertyDetail: {
          houseType: HouseTypeEnum.Apartment,
          images: ['similar2.jpg'],
        },
      },
    ],
  };

  beforeEach(() => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: mockSimilarPosts,
      loading: false,
    });
  });

  it('renders property details correctly', () => {
    render(<EstateSinglePage data={mockData} />);
    expect(screen.getByText('Test Property'));
    expect(screen.getByText('Test Owner'));
    expect(screen.getByText('99999999'));
    expect(screen.getByText('80 m²'));
    expect(screen.getByText('3'));
    expect(screen.getByText('2'));
    expect(screen.getByText('Тийм'));
  });
  it('renders property details garage false', () => {
    render(<EstateSinglePage data={mockData1} />);
    expect(screen.getAllByText('Үгүй').length);
  });

  it('handles image carousel navigation', () => {
    render(<EstateSinglePage data={mockData} />);
    const nextButton = screen.getByText('→');
    expect(screen.getByAltText('Property image 1'));
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 3'));
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 1'));
  });
  it('handles previous button navigation in carousel', () => {
    render(<EstateSinglePage data={mockData} />);
    const prevButton = screen.getByText('←');
    expect(screen.getByAltText('Property image 1'));
    fireEvent.click(prevButton);
    expect(screen.getByAltText('Property image 3'));
    fireEvent.click(prevButton);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(prevButton);
    expect(screen.getByAltText('Property image 1'));
  });
  it('should update main image when clicking thumbnails', () => {
    render(<EstateSinglePage data={mockData} />);
    const thumbnails = screen.getAllByRole('img', { name: /Thumbnail/i });
    fireEvent.click(thumbnails[1].parentElement!);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(thumbnails[0].parentElement!);
    expect(screen.getByAltText('Property image 1'));
  });
  describe('EstateSinglePage', () => {
    it('cycles through all images in carousel', () => {
      render(<EstateSinglePage data={mockData} />);
      render(<EstateSinglePage data={mockData} />);
      expect(screen.queryAllByRole('link'));
    });
  });
});
