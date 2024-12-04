import { CreateEventDocument } from "@/generated";
import { MockedResponse } from "@apollo/client/testing";

export const createEventMock: MockedResponse = {
    request: {
      query: CreateEventDocument,
      variables: {
        input: {
          name: 'Test Event',
          artistName: ['Test Artist'],
          description: 'Test Description',
          eventDate: ['2024-10-20'],
          eventTime: ['01:00'],
          location: 'Төв Цэнгэлдэх',
          images: undefined,
          discount: 20,
          venues: [
            { firstquantity: 100, name: 'Энгийн', price: 5000, quantity: 100 },
            { firstquantity: 100, name: 'Fan-Zone', price: 5000, quantity: 100 },
            { firstquantity: 5000, name: 'Vip', price: 100, quantity: 5000 },
          ],
        },
      },
    },
    result: {
      data: {
        createEvent: {
          id: '1',
          name: 'Test Event',
          artistName: ['Test Artist'],
          description: 'Test Description',
          eventDate: ['2024-10-20'],
          eventTime: ['01:00'],
          location: 'Төв Цэнгэлдэх',
          images: [''],
          venues: [
            { name: 'Энгийн', firstquantity: 100, price: 5000, quantity: 100 },
            { name: 'Fan-Zone', firstquantity: 100, price: 5000, quantity: 100 },
            { name: 'Vip', firstquantity: 5000, price: 100, quantity: 5000 },
          ],
          discount: 20,
          createdAt: '2024-10-20',
          updatedAt: '2024-10-20',
        },
      },
    },
  };
  
  export const createEventMockWithError: MockedResponse = {
    request: {
      query: CreateEventDocument,
      variables: {
        input: {
          name: 'Test Event',
          artistName: ['Test Artist'],
          description: 'Test Description',
          eventDate: ['2024-10-20'],
          location: 'Төв Цэнгэлдэх',
          eventTime: ['01:00'],
          images: [''],
          discount: 20,
          venues: [
            { firstquantity: 100, name: 'Энгийн', price: 5000, quantity: 100 },
            { firstquantity: 100, name: 'Fan-Zone', price: 5000, quantity: 100 },
            { firstquantity: 5000, name: 'Vip', price: 100, quantity: 5000 },
          ],
        },
      },
    },
    error: new Error('Event creation failed'),
  };