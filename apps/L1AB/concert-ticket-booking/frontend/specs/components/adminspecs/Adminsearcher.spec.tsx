import { render, fireEvent } from '@testing-library/react';
import { AdminSearcher } from '@/components';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllEventsDocument } from '@/generated';

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect }: { onSelect: (_: Date) => void }) => (
    <div data-testid="calendar">
      <button onClick={() => onSelect(new Date())}>Select Date</button>
    </div>
  ),
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
              },{
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
  
  it('should successfully render', () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();
    
    
    const { getByTestId, getAllByTestId } = render

    (<MockedProvider mocks={[mock]}><AdminSearcher
      setSearchValue={setSearchValue} 
     setSelectedValues={setSelectedValues} 
     selectedValues={[]} 
     date={undefined} 
     setDate={setDate}/></MockedProvider>
    );

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
  });

  it('should successfully render', () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();
    const { getByTestId } = render(<MockedProvider mocks={[mock]}><AdminSearcher
      setSearchValue={setSearchValue} 
     setSelectedValues={setSelectedValues} 
     selectedValues={[]} 
     date={undefined} 
     setDate={setDate} /></MockedProvider>
    );
    const clearbtn = getByTestId('clear-btn');

    fireEvent.click(clearbtn);
  });
  it('should successfully render and display placeholder for date when no date is selected', () => {
    const setSearchValue = jest.fn();
    const setSelectedValues = jest.fn();
    const setDate = jest.fn();
    const { getByTestId } = render(<MockedProvider mocks={[mock]}><AdminSearcher
      setSearchValue={setSearchValue} 
     setSelectedValues={setSelectedValues} 
     selectedValues={[]} 
     date={undefined} 
     setDate={setDate}  /></MockedProvider>
    );
    const dateButton = getByTestId('choose-date-id');
    fireEvent.click(dateButton);

    const calendar = getByTestId('calendar');
    fireEvent.click(calendar);
    const select = getByTestId('clear-date-btn');
    fireEvent.click(select);
  });
});
