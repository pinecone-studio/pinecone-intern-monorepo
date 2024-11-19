import { AdminDash, } from "@/components";
import { GetAllEventsDocument } from "@/generated";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";


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
describe('AdminDash', () => {
  it('should render successfully', async () => {
    const {getByTestId}=
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDash />
      </MockedProvider>
    );
    await waitFor(()=>{
      const table = getByTestId('get-events-0')
      expect(table)
    })
  });
});

