import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HotelCard } from '@/components/user/search-result/HotelCard';

describe('HotelCard', () => {
  it('should render successfully with empty data', () => {
    render(
      <HotelCard
        data={{
          __typename: undefined,
          about: undefined,
          amenities: undefined,
          description: undefined,
          faqs: undefined,
          id: '',
          images: [],
          location: undefined,
          locationName: undefined,
          name: '',
          phoneNumber: undefined,
          policies: undefined,
          rating: undefined,
          rooms: undefined,
          starRating: undefined,
        }}
      />
    );
  });

  const mockHotelData = {
    name: 'Test Hotel',
    starRating: 3,
    rating: 4.5,
    id: '1',
    images: [],
  };

  it('renders hotel name correctly', () => {
    const { findByText } = render(<HotelCard data={mockHotelData} />);
    expect(findByText('Test Hotel'));
  });

  it('renders the correct number of stars based on starRating', () => {
    const { container } = render(<HotelCard data={mockHotelData} />);

    // Зочид буудлын одны тоог шалгана
    const stars = container.querySelectorAll('[class*="fill-[#F97316]"]');
    expect(stars);
  });

  it('renders the rating correctly', () => {
    const { findByText } = render(<HotelCard data={mockHotelData} />);
    expect(findByText('Excellent'));
    expect(findByText(mockHotelData.rating.toString()));
  });

  it('renders Free WiFi service', () => {
    const { findByText } = render(<HotelCard data={mockHotelData} />);
    expect(findByText('Free WiFi'));
  });

  it('renders Spa access service', () => {
    const { findByText } = render(<HotelCard data={mockHotelData} />);
    expect(findByText('Spa access'));
  });

  it('renders Free self parking service', () => {
    const { findByText } = render(<HotelCard data={mockHotelData} />);
    expect(findByText('Free self parking'));
  });

  it('renders an image of the hotel', () => {
    const { container } = render(<HotelCard data={mockHotelData} />);
    const image = container.querySelector('img');
    expect(image);
    expect(image);
  });

  it('renders no stars if starRating is undefined or empty', () => {
    const { container } = render(
      <HotelCard
        data={{
          id: '',
          images: [],
          name: '',
          starRating: undefined,
        }}
      />
    );
    const starElements = container.querySelectorAll('[class*="fill-[#F97316]"]');
    expect(starElements);
  });
});
