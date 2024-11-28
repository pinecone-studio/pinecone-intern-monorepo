import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { HotelsGrid } from '@/components/main';
import { GetAllHotelsDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

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
describe('Main Hotels Grid', () => {
  it('should render the main hotels grid', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <HotelsGrid />
      </MockedProvider>
    );
    await waitFor(() => {
      const hotel = getByTestId('hotels-card');
      fireEvent.click(hotel);
    });
  });
});
