import { render, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllEventsDocument } from '@/generated';
import { SearchPageComponent } from '@/components/maincomponents/SearchPageComponent';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
const mock: MockedResponse = {
  request: {
    query: GetAllEventsDocument,
  },
  result: {
    data: {
      getAllEvents: [
        {
          _id: '1',
          name: 'Rock Concert',
          artistName: ['Band A', 'Band B'],
          description: 'An amazing rock concert.',
          eventDate: ['2024-11-25', '2024-11-25'],
          eventTime: '18:00',
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image2.jpg'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50 },
            { name: 'Venue B', quantity: 150, price: 70 },
          ],
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
        {
          _id: '2',
          name: 'Jazz Festival',
          artistName: ['Jazz Band X'],
          description: 'A smooth and soulful jazz festival.',
          eventDate: ['2024-11-25'],
          eventTime: '20:00',
          images: ['https://example.com/image1.jpg'],
          venues: [
            { name: 'Venue C', quantity: 200, price: 80 },
            { name: 'Venue D', quantity: 50, price: 100 },
          ],
          discount: 15,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};

describe('SearchPageComponent', () => {
  it('renders events successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <SearchPageComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const searchComponent = getByTestId('searchpagecomponent');
      expect(searchComponent);
    });
  });

  it('updates searchTerm on input change and filters results', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <SearchPageComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const searchComponent = getByTestId('searchpagecomponent');
      expect(searchComponent);
    });
    const searchInput = getByTestId('searchinput');
    expect(searchInput);

    fireEvent.change(searchInput, { target: { value: 'Eaiusdiausdhn' } });

    expect(searchInput);
  });
});
