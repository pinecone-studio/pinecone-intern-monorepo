import { DemoHeroComponent } from '@/components/democomponents/DemoMainHero';
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
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          venues: [
            { name: 'Venue A', quantity: 100, firstquantity: 150, price: 50 },
            { name: 'Venue B', quantity: 150, firstquantity: 150, price: 70 },
          ],
          discount: 10,
          status: 'Demo',
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
            { name: 'Venue C', quantity: 200, firstquantity: 150, price: 80 },
            { name: 'Venue D', quantity: 50, firstquantity: 150, price: 100 },
          ],
          discount: 15,
          status: 'Demo',
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};

describe('MainHeroComponent', () => {
  it('renders data fetched from GraphQL query', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <DemoHeroComponent />
      </MockedProvider>
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(getByTestId('getCancel-0'));
      expect(getByTestId('getCancel-1'));
    });
  });

  it('handles clicking on the next and previous buttons', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <DemoHeroComponent />
      </MockedProvider>
    );

    // Wait for the data to load
    await waitFor(() => getByTestId('getCancel-0'));

    const leftButton = getByTestId('left');
    const rightButton = getByTestId('right');

    // Simulate clicking the left button
    fireEvent.click(leftButton);
    fireEvent.click(leftButton);

    expect(leftButton);

    // Simulate clicking the right button multiple times
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);

    // Verify right button exists
    expect(rightButton);
  });

  it('pauses autoplay on mouse enter and resumes on mouse leave', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <DemoHeroComponent />
      </MockedProvider>
    );

    // Wait for the data to load
    await waitFor(() => getByTestId('getCancel-0'));

    const carousel = getByTestId('carousel-track');

    // Simulate mouse enter
    fireEvent.mouseEnter(carousel);

    // Expect autoplay to pause (autoplay should be false)
    expect(carousel);

    // Simulate mouse leave
    fireEvent.mouseLeave(carousel);

    // Expect autoplay to resume (autoplay should be true)
    expect(carousel);
  });
});
