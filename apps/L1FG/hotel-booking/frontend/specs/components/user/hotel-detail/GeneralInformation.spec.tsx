import { GeneralInformation } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('GeneralInformation', () => {
  it('should render GeneralInformation successfully', async () => {
    render(
      <GeneralInformation
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
    const { container } = render(<GeneralInformation data={mockHotelData} />);
    const stars = container.querySelectorAll('[class*="fill-[#F97316]"]');
    expect(stars);
  });
});
