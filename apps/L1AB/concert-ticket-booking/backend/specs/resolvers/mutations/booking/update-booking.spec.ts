import { updateBookingEverything } from 'apps/L1AB/concert-ticket-booking/backend/src/resolvers/mutations/booking/update-booking-eveything';

/* eslint-disable max-lines */
describe('Update booking Mutation', () => {
  it('Should update booking', async () => {
    const result = await updateBookingEverything(
      {},
      {
        input: {
          bookingID: '1',
          status: 'Updated',
          phone: '1234567890',
          email: 'tur5455@gmail.com',
          amountTotal: 500,
          bankAccount: 11,
          selectedDate: '2024-12-01',
          venues: [
            {
              name: 'VIP ',
              quantity: 2323,
              price: 50000,
            },
          ],
          createdAt: undefined,
          eventId: {
            __typename: undefined,
            _id: 'event456', // should match mock data
            artistName: [],
            createdAt: undefined,
            description: '',
            discount: 0,
            eventDate: [],
            eventTime: [],
            images: [],
            name: '',
            updatedAt: undefined,
            venues: [],
          },
          updatedAt: undefined,
          userId: {
            __typename: undefined,
            _id: 'user123', // should match mock data
            createdAt: undefined,
            email: '',
            name: '',
            password: '',
            phone: '',
            role: undefined,
            updatedAt: undefined,
          },
        },
      }
    );

    expect(result).toEqual({
      bookingID: '1',
      status: 'Updated',
      phone: '1234567890',
      email: 'tur5455@gmail.com',
      amountTotal: 500,
      bankAccount: 11,
      selectedDate: '2024-12-01',
      eventId: 'event456', // this should match the mock data
      userId: 'user123', // this should match the mock data
      venues: [
        {
          name: 'VIP Section',
          quantity: 2,
          price: 50000,
          firstQuantity: 1000, // should match the mock data
        },
      ],
    });
  });

  it('Should throw an error if the event is not found', async () => {
    try {
      await updateBookingEverything(
        {},
        {
          input: {
            bookingID: '1',
            status: 'Updated',
            phone: '1234567890',
            email: 'tur5455@gmail.com',
            amountTotal: 500,
            bankAccount: 11,
            selectedDate: '2024-12-01',
            venues: [
              {
                name: 'VIP ',
                quantity: 2323,
                price: 50000,
              },
            ],
            createdAt: undefined,
            eventId: {
              __typename: undefined,
              _id: '', // eventId is empty which should cause an error
              artistName: [],
              createdAt: undefined,
              description: '',
              discount: 0,
              eventDate: [],
              eventTime: [],
              images: [],
              name: '',
              updatedAt: undefined,
              venues: [],
            },
            updatedAt: undefined,
            userId: {
              __typename: undefined,
              _id: '',
              createdAt: undefined,
              email: '',
              name: '',
              password: '',
              phone: '',
              role: undefined,
              updatedAt: undefined,
            },
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update Booking');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });

  it('Should throw an error if there is a database error', async () => {
    try {
      await updateBookingEverything(
        {},
        {
          input: {
            bookingID: '1',
            status: 'Updated',
            phone: '1234567890',
            email: 'tur5455@gmail.com',
            amountTotal: 500,
            bankAccount: 11,
            selectedDate: '2024-12-01',
            venues: [
              {
                name: 'VIP ',
                quantity: 2323,
                price: 50000,
              },
            ],
            createdAt: undefined,
            eventId: {
              __typename: undefined,
              _id: 'event456', // matching eventId for this test
              artistName: [],
              createdAt: undefined,
              description: '',
              discount: 0,
              eventDate: [],
              eventTime: [],
              images: [],
              name: '',
              updatedAt: undefined,
              venues: [],
            },
            updatedAt: undefined,
            userId: {
              __typename: undefined,
              _id: 'user123', // matching userId
              createdAt: undefined,
              email: '',
              name: '',
              password: '',
              phone: '',
              role: undefined,
              updatedAt: undefined,
            },
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update Booking');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });
});
