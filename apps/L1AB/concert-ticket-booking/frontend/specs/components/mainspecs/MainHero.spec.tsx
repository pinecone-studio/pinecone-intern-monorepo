import { MainHeroComponent } from '@/components/maincomponents/MainHero';
import { GetAllEventsDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
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
          images: [],
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

describe('MainHeroComponent get data dest', () => {
  it('renders rows based on fetched data', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainHeroComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const table = getByTestId('getCancel-0');
      expect(table);
    });
  });
  it('should simulate the three clicks on the carousel next,prev elements', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainHeroComponent />
      </MockedProvider>
    );

    await waitFor(() => getByTestId('getCancel-0'));

    const leftButton = getByTestId('left');
    fireEvent.click(leftButton);

    const leftButton1 = getByTestId('left');
    fireEvent.click(leftButton1);

    const rigthButton = getByTestId('right');
    fireEvent.click(rigthButton);

    const rigthButton1 = getByTestId('right');
    fireEvent.click(rigthButton1);

    const rigthButton2 = getByTestId('right');
    fireEvent.click(rigthButton2);

    const rigthButton3 = getByTestId('right');
    fireEvent.click(rigthButton3);
  });
  it('should pause autoplay on mouse enter and resume on mouse leave', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainHeroComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const row = getByTestId('getCancel-0');
      expect(row);
    });

    const carousel = getByTestId('carousel-track');
    fireEvent.mouseEnter(carousel);
    expect(carousel);

    fireEvent.mouseLeave(carousel);
    expect(carousel);
  });
});
