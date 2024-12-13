import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllBookingDocument } from '@/generated';
import { BookingComponent } from '@/components/admincomponents/BookingComponent';

const mock: MockedResponse = {
  request: {
    query: GetAllBookingDocument,
  },
  result: {
    data: {
      getAllBooking: [
        {
          _id: '1',
          bankName: 'Golomt',
          bankAccount: '1234567',
          status: 'Цуцлах хүсэлт илгээсэн',
          amountTotal: 100000,
          phone: '99999999',
          email: 'user1@example.com',
          selectedDate: '2024-12-01',
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-15T06:24:52.763Z',
          userId: {
            _id: '1',
            name: 'Naba',
          },
          eventId: {
            _id: '1',
            name: 'Rock Concert',
          },
        },
        {
          _id: '2',
          bankName: 'Khan Bank',
          bankAccount: '7654321',
          status: 'Цуцлагдсан',
          amountTotal: undefined,
          phone: '88888888',
          email: 'user2@example.com',
          selectedDate: '2024-12-05',
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-15T06:24:52.763Z',
          userId: {
            _id: '2',
            name: 'Sara',
          },
          eventId: {
            _id: '2',
            name: 'Jazz Night',
          },
        },
        {
            _id: '2',
            bankName: 'Khan Bank',
            bankAccount: '7654321',
            status: 'Баталгаажсан',
            amountTotal: undefined,
            phone: '88888888',
            email: 'user2@example.com',
            selectedDate: '2024-12-05',
            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-15T06:24:52.763Z',
            userId: {
              _id: '2',
              name: 'Sara',
            },
            eventId: {
              _id: '2',
              name: 'Jazz Night',
            },
          },
      ],
    },
  },
};
describe('CancelComponent', () => {
  it('renders rows based on fetched data', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <BookingComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const table = getByTestId('getCancel-0');
      expect(table);
    });
  });

  it('should simulate the three clicks on the AlertDialog elements', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <BookingComponent />
      </MockedProvider>
    );

    await waitFor(() => screen.getByTestId('getCancel-0'));

    const triggerButton = screen.getByTestId('getSelect-0');
    fireEvent.click(triggerButton);
    const triggerButton1 = screen.getByTestId('getSelect-1');
    fireEvent.click(triggerButton1);
    const triggerButton2 = screen.getByTestId('getSelect-2');
    fireEvent.click(triggerButton2);
    const triggerButton3 = screen.getByTestId('getSelect-3');
    fireEvent.click(triggerButton3);
    const triggerButton4 = screen.getByTestId('getSelect-4');
    fireEvent.click(triggerButton4);
    const triggerButton5 = screen.getByTestId('getSelect-5');
    fireEvent.click(triggerButton5);

   
  });
});
