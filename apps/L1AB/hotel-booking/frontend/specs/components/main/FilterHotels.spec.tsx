import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllHotelsDocument } from '@/generated';
import { FilterHotels } from '@/components/main';

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
        {
          _id: '2',
          name: 'Star Hotel',
          description: '4 stars Hotel',
          images: ['https://example.com/image3.jpg'],
          address: 'Moon Road 2-nd District',
          phone: '22222222',
          city: 'moon',
          rating: 9,
          stars: 5,
          rooms: [],
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
        {
          _id: '2',
          name: 'sky Hotel',
          description: '5 stars Hotel',
          images: ['https://example.com/image3.jpg'],
          address: 'Moon Road 2-nd District',
          phone: '33333333',
          city: 'moon',
          rating: 7,
          stars: 5,
          rooms: [],
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};
const mockDontHaveRating = {
  request: {
    query: GetAllHotelsDocument,
  },
  result: {
    data: {
      getAllHotels: [
        {
          _id: '6',
          name: 'UB Hotel',
          description: '5 stars Hotel',
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          address: 'Sun Road 1-st District',
          phone: '11111111',
          city: 'ub',
          rating: undefined,
          stars: undefined,
          rooms: [],
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        }
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
     await waitFor(() => {
      expect(screen.getByText(/properties found/i))
    });
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Star' } });

    const ratingRadio = screen.getByLabelText('+7');
    fireEvent.click(ratingRadio);

    const starsRadio = screen.getByLabelText('5 stars');
    fireEvent.click(starsRadio);

    fireEvent.change(searchInput, { target: { value: 'Nonexistent Hotel' } });
    await waitFor(() => {
      expect(screen.getByText(/No hotels found/i))
    });
  });
  it('should render the main filter hotels', async () => {
    render(
      <MockedProvider mocks={[mockDontHaveRating]} addTypename={false}>
        <FilterHotels />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen)
    });
  });
});
