import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FilterHotels } from '@/components/main';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllHotelsDocument } from '@/generated';

const mock = {
  request: {
    query: GetAllHotelsDocument,
  },
  result: {
    data: {
      getAllHotels: [
        {
          _id: '1',
          name: 'UB Hotel',
          description: '5 stars Hotel',
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          address: 'Sun Road 1-st District',
          phone: '11111111',
          city: 'ub',
          rating: 8,
          stars: 3,
          rooms: [],
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};
describe('Main Filter Hotels', () => {
  it('should render the main filter hotels', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <FilterHotels />
      </MockedProvider>
    );

    const hotelCard = await screen.findByTestId('filter-hotel-card');
    expect(hotelCard);
  });
});
