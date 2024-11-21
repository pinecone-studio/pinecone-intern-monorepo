import { render, fireEvent, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllEventsDocument } from '@/generated';
import { SearchPageComponent } from '@/components/maincomponents/SearchPageComponent';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected }: { onSelect: (_date: Date | undefined) => void; selected: Date | undefined }) => {
    console.log('Rendering calendar with selected date:', selected); // Debugging line
    return (
      <div data-testid="calendar">
        <span>Selected: {selected ? selected.toISOString().split('T')[0] : 'None'}</span>
        <button onClick={() => onSelect(undefined)}>Clear Selection</button>
        <button onClick={() => onSelect(new Date('2024-09-21'))} data-testid="calendar-select">
          Select Date
        </button>
      </div>
    );
  },
}));

const mock = {
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
  it('clears the selected date when the X button is clicked', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <SearchPageComponent />
      </MockedProvider>
    );

    const calendarButton = await screen.findByTestId('calendar-button');
    expect(calendarButton);

    fireEvent.click(calendarButton);

    const selectButton = await screen.findByTestId('calendar-select');
    expect(selectButton);

    fireEvent.click(selectButton);

    const clearButton = screen.getByTestId('calendar-clear');
    fireEvent.click(clearButton);
  });
});
