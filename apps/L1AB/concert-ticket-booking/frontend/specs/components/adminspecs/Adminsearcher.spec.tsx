/* eslint-disable max-lines */
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { AdminSearcher } from '@/components';
import { GetAllEventsDocument } from '@/generated';

const mockData = {
  request: {
    query: GetAllEventsDocument,
  },
  result: {
    data: {
      getAllEvents: [
        {
          _id: '1',
          name: 'Event 1',
          artistName: ['Artist 1'],
          description: 'Event description',
          eventDate: '2022-01-01',
          eventTime: '18:00',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            { name: 'VIP', quantity: 100, price: 100 },
            { name: 'fanzone', quantity: 100, price: 100 },
            { name: 'regular', quantity: 100, price: 100 },
          ],
          discount: 10,
        },
        {
          _id: '2',
          name: 'Event 2',
          artistName: ['Artist 2'],
          description: 'Event description',
          eventDate: '2022-02-01',
          eventTime: '19:00',
          images: ['image_url_3', 'image_url_4'],
          venues: [
            { name: 'VIP', quantity: 150, price: 200 },
            { name: 'fanzone', quantity: 150, price: 200 },
            { name: 'regular', quantity: 150, price: 200 },
          ],
          discount: 15,
        },
      ],
    },
  },
};

describe('AdminSearcher Component', () => {
  it('should render and allow searching for events', async () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();

    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValues} selectedValues={[]} date={undefined} setDate={setDate} />
      </MockedProvider>
    );

    const searchInput = screen.getByPlaceholderText('Тасалбар хайх');
    fireEvent.change(searchInput, { target: { value: 'Event' } });
    expect(setSearchValue);
  });

  it('should clear the artist selection', async () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();

    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValues} selectedValues={['Artist 1']} date={undefined} setDate={setDate} />
      </MockedProvider>
    );

    const clearBtn = screen.getByTestId('clear-btn');
    fireEvent.click(clearBtn);

    expect(setSelectedValues);
  });

  it('should select a date', async () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();

    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValues} selectedValues={[]} date={undefined} setDate={setDate} />
      </MockedProvider>
    );

    const dateButton = screen.getByTestId('choose-date-id');
    fireEvent.click(dateButton);

    const calendarDay = screen.getByText('20');
    fireEvent.click(calendarDay);

    expect(setDate);
  });

  it('should clear the selected date', async () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();

    render(
      <MockedProvider mocks={[mockData]} addTypename={false}>
        <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValues} selectedValues={[]} date={new Date()} setDate={setDate} />
      </MockedProvider>
    );
    const clearDateBtn = screen.getByTestId('clear-date');
    fireEvent.click(clearDateBtn);

    expect(setDate);
  });
  it('should successfully render', async () => {
    const setSearchValue = jest.fn();

    const setDate = jest.fn();
    const setSelectedValuesMock = jest.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={[mockData]}>
        <AdminSearcher setSearchValue={setSearchValue} setSelectedValues={setSelectedValuesMock} selectedValues={[]} date={undefined} setDate={setDate} />
      </MockedProvider>
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    await waitFor(async () => {
      const select = getByTestId('admin-searcher-select');
      fireEvent.keyDown(select, { key: 'Enter' });

      const options = await screen.getAllByTestId('option');
      fireEvent.keyDown(options[0], { key: 'Enter' });
    });
  });
});
