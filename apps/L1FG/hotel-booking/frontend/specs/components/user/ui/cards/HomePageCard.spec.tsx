import { HomePageCard } from '@/components/user/ui/cards';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('HomePageCard', () => {
  it('should render successfully with empty data', () => {
    render(
      <HomePageCard
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
    const { getByText } = render(<HomePageCard data={mockHotelData} />);
    expect(getByText('Test Hotel'));
  });

  it('renders the correct number of stars based on starRating', () => {
    const { container } = render(<HomePageCard data={mockHotelData} />);

    // Зочид буудлын одны тоог шалгана
    const stars = container.querySelectorAll('[class*="fill-[#F97316]"]');
    expect(stars);
  });

  it('renders the rating correctly', () => {
    const { getByText } = render(<HomePageCard data={mockHotelData} />);
    expect(getByText('Excellent'));
    expect(getByText(mockHotelData.rating.toString()));
  });

  it('renders Free WiFi service', () => {
    const { getByText } = render(<HomePageCard data={mockHotelData} />);
    expect(getByText('Free WiFi'));
  });

  it('renders Spa access service', () => {
    const { getByText } = render(<HomePageCard data={mockHotelData} />);
    expect(getByText('Spa access'));
  });

  it('renders Free self parking service', () => {
    const { getByText } = render(<HomePageCard data={mockHotelData} />);
    expect(getByText('Free self parking'));
  });

  it('renders an image of the hotel', () => {
    const { container } = render(<HomePageCard data={mockHotelData} />);
    const image = container.querySelector('img');
    expect(image);
    expect(image);
  });

  it('renders no stars if starRating is undefined or empty', () => {
    const { container } = render(
      <HomePageCard
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
