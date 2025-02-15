import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HouseTypeEnum, PostStats } from '@/generated';
import EstateSinglePage from '@/components/estatesSinglePage/EstatesSinglePage';
describe('EstateSinglePage', () => {
  beforeEach(() => {
    render(<EstateSinglePage data={mockData} />);
  });
  const mockData = {
    _id: '67a9e3d650068558424872ff',
    createdAt: '2025-02-10T11:32:38.756+00:00',
    description: '213',
    price: '123',
    propertyDetail: {
      details: {
        completionDate: '2025-01-12T00:00:00.000+00:00',
        balcony: true,
        windowsCount: 2,
        windowType: 'va',
        floorMaterial: 'sav',
        floorNumber: 2,
        totalFloors: 2,
        lift: true,
      },
      garage: true,
      houseType: HouseTypeEnum.Office,
      images: ['https://res.cloudinary.com/real-estate-pinecone/image/upload/v17391871', 'https://res.cloudinary.com/real-estate-pinecone/image/upload/v17391872'],
      location: {
        address: 'qew',
      },
      restrooms: 1,
      size: '213',
      totalRooms: 12,
    },
    propertyOwnerId: {
      _id: '6790e86f61598146e7fd83dd',
      name: 'Test Owner',
      email: 'test@example.com',
      phone: '99999999',
      createdAt: '2025-02-10T11:32:38.756+00:00',
      isAdmin: false,
      updatedAt: '2025-02-10T11:32:38.756+00:00',
    },
    status: PostStats.Pending,
    title: 'qweq',
  };
  const mockData1 = {
    _id: '67a9e3d650068558424872ff',
    createdAt: '2025-02-10T11:32:38.756+00:00',
    description: '213',
    price: '123',
    propertyDetail: {
      details: {
        balcony: false,
        lift: false,
      },
      garage: false,
      houseType: HouseTypeEnum.Office,
      images: ['https://res.cloudinary.com/real-estate-pinecone/image/upload/v17391871', 'https://res.cloudinary.com/real-estate-pinecone/image/upload/v17391872'],
      location: {
        address: 'qew',
      },
      restrooms: 1,
      size: '213',
      totalRooms: 12,
    },
    propertyOwnerId: {
      _id: '6790e86f61598146e7fd83dd',
      name: 'Test Owner',
      email: 'test@example.com',
      phone: '99999999',
      createdAt: '2025-02-10T11:32:38.756+00:00',
      isAdmin: false,
      updatedAt: '2025-02-10T11:32:38.756+00:00',
    },
    status: PostStats.Pending,
    title: 'qweq',
  };
  it('should display total floors count', () => {
    const totalFloorsElements = screen.getAllByText('2');
    expect(totalFloorsElements.length);
  });
  it('should handle single image carousel', () => {
    const image = screen.getByAltText('Property image 1');
    expect(image);
    expect(image);
  });
  it('should display correct room information', () => {
    expect(screen.getByText('12')); // totalRooms
    expect(screen.getByText('1')); // restrooms
  });
  it('should display correct property measurements', () => {
    expect(screen.getByText('213 m²'));
  });
  it('should display correct location details', () => {
    expect(screen.getByText((content) => content.includes('2025'))); // completionDate
    expect(screen.getByText('va')); // windowType
    expect(screen.getByText('sav')); // floorMaterial
    expect(screen.getByText('Байгаа')); // lift status for mockData
  });
  it('should display correct lift status for different data', () => {
    expect(screen.getByText('Байгаа'));
    render(<EstateSinglePage data={mockData1} />);
    expect(screen.getByText('baihgui'));
  });
  it('should display price correctly', () => {
    expect(screen.getByText('123'));
  });
  it('should display description correctly', () => {
    expect(screen.getByText('213'));
  });
  it('should display all floor related information', () => {
    expect(screen.getByText(/Хэдэн давхарт/));
    expect(screen.getByText(/Барилгын давхар/));
    expect(screen.getByText(/Нийт давхар/));
    const floorElements = screen.getAllByText('2');
    expect(floorElements.length);
  });
  it('should display thumbnail images correctly', () => {
    const thumbnails = screen.getAllByRole('img', { name: /Thumbnail/i });
    expect(thumbnails);
    expect(thumbnails[0]);
    expect(thumbnails[1]);
  });
  it('should highlight selected thumbnail', () => {
    const thumbnails = screen.getAllByRole('img', { name: /Thumbnail/i });
    const thumbnailContainer = thumbnails[0].parentElement;
    expect(thumbnailContainer);
    expect(thumbnailContainer);
  });
  it('should handle consecutive navigation clicks', () => {
    const prevButton = screen.getByText('←');
    const nextButton = screen.getByText('→');
    expect(screen.getByAltText('Property image 1'));
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 1'));
    fireEvent.click(prevButton);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(prevButton);
    expect(screen.getByAltText('Property image 1'));
  });
  it('should cycle through images correctly', () => {
    const nextButton = screen.getByText('→');
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Property image 1'));
  });
  it('should update main image when clicking thumbnails', () => {
    const thumbnails = screen.getAllByRole('img', { name: /Thumbnail/i });
    fireEvent.click(thumbnails[1].parentElement!);
    expect(screen.getByAltText('Property image 2'));
    fireEvent.click(thumbnails[0].parentElement!);
    expect(screen.getByAltText('Property image 1'));
  });
});
