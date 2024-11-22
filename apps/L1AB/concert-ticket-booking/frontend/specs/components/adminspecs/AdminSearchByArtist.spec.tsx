import { AdminSearcher } from '@/components';
import { GetAllEventsDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';
const mock: MockedResponse = {
  request: {
    query: GetAllEventsDocument,
  },
  result: {
    data: {
      getAllEvents: [
        {
          _id: '1',
          name: 'Event 1',
          artistName: 'Artist',
          description: 'Event description',
          eventDate: '2022-01-01',
          eventTime: '18:00',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            {
              name: 'VIP',
              quantity: 100,
              price: 100,
            },
            {
              name: 'fanzone',
              quantity: 100,
              price: 100,
            },
            {
              name: 'regular',
              quantity: 100,
              price: 100,
            },
          ],
          discount: 10,
        },
        {
          _id: '2',
          name: 'Event 2',
          artistName: 'Artist 2',
          description: 'Event description',
          eventDate: '2022-01-01',
          eventTime: '18:00',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            {
              name: 'VIP',
              quantity: 100,
              price: 100,
            },
            {
              name: 'fanzone',
              quantity: 100,
              price: 100,
            },
            {
              name: 'regular',
              quantity: 100,
              price: 100,
            },
          ],
          discount: 10,
        },
        {
          _id: '3',
          name: 'Event 3',
          artistName: 'Artist 3',
          description: 'Event description',
          eventDate: '2022-01-01',
          eventTime: '18:00',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            {
              name: 'VIP',
              quantity: 100,
              price: 100,
            },
            {
              name: 'fanzone',
              quantity: 100,
              price: 100,
            },
            {
              name: 'regular',
              quantity: 100,
              price: 100,
            },
          ],
          discount: 10,
        },
      ],
    },
  },
};

describe('AdminSearcher Component', () => {
  it('should successfully render', async () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();

    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[mock]}>
        <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValues} selectedValues={[]} date={undefined} setDate={setDate} />
      </MockedProvider>
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    // await waitFor(() => getByTestId('option'));

    const select = getByTestId('admin-searcher-select');
    fireEvent.keyDown(select, { key: 'Enter' });

    const options = getAllByTestId('option');
    fireEvent.keyDown(options[0], { key: 'Enter' });

    const select2 = getByTestId('admin-searcher-select');
    fireEvent.keyDown(select2, { key: 'Enter' });

    const optionsSecond = getAllByTestId('option');
    fireEvent.keyDown(optionsSecond[1], { key: 'Enter' });

    const select3 = getByTestId('admin-searcher-select');
    fireEvent.keyDown(select3, { key: 'Enter' });

    const optionsThird = getAllByTestId('option');
    fireEvent.keyDown(optionsThird[0], { key: 'Enter' });

    const searchButton = getByTestId('button-input');
    fireEvent.click(searchButton);
  });
});
