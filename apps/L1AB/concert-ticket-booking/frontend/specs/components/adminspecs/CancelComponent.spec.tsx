import { CancelComponent } from '@/components';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllBookingDocument, UpdateBookingDocument } from '@/generated';

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
      ],
    },
  },
};

const mockUpdate: MockedResponse = {
  request: {
    query: UpdateBookingDocument,
    variables: {
      input: { _id: '1', status: 'Цуцлах хүсэлт илгээсэн' },
    },
  },
  result: {
    data: {
      updateCancel: {
        _id: '1',
        status: 'Цуцлах хүсэлт илгээсэн',
      },
    },
  },
};
const mockUpdate1: MockedResponse = {
  request: {
    query: UpdateBookingDocument,
    variables: {
      input: { _id: '1', status: 'Цуцлагдсан' },
    },
  },
  result: {
    data: {
      updateCancel: {
        _id: '1',
        status: 'Цуцлагдсан',
      },
    },
  },
};
describe('CancelComponent', () => {
  it('renders rows based on fetched data', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <CancelComponent />
      </MockedProvider>
    );

    await waitFor(() => {
      const table = getByTestId('getCancel-0');
      expect(table);
    });
  });

  it('should simulate the three clicks on the AlertDialog elements', async () => {
    render(
      <MockedProvider mocks={[mock, mockUpdate, mockUpdate1]} addTypename={false}>
        <CancelComponent />
      </MockedProvider>
    );

    await waitFor(() => screen.getByTestId('getCancel-0'));

    const triggerButton = screen.getByTestId('click1-0');
    fireEvent.click(triggerButton);

    const cancelButton = screen.getByTestId('cancelButton');
    fireEvent.click(cancelButton);

    const triggerButton1 = screen.getByTestId('click1-0');
    fireEvent.click(triggerButton1);

    const actionButton = screen.getByTestId('actionButton');
    fireEvent.click(actionButton);
  });
});
