import { CancelComponent } from '@/components';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllCancelBookingDocument, UpdateCancelDocument } from '@/generated';

const mock: MockedResponse = {
  request: {
    query: GetAllCancelBookingDocument,
  },
  result: {
    data: {
      getAllCancelBooking: [
        {
          _id: '1',
          bankName: 'Golomt',
          bankAccount: '1234567',
          status: 'Шилжүүлсэн',
          amountTotal: 100,
          createdAt: '2024-11-14T06:24:52.763Z',
          userId: {
            _id: '1',
            name: 'naba',
          },
          eventId: {
            _id: '1',
            name: 'rockconcert',
          },
        },
        {
          _id: '2',
          bankName: 'Golomt',
          bankAccount: '1234567',
          status: 'йыбйыб',
          amountTotal: 100,
          createdAt: '2024-11-14T06:24:52.763Z',
          userId: {
            _id: '1',
            name: 'naba',
          },
          eventId: {
            _id: '1',
            name: 'rockconcert',
          },
        },
      ],
    },
  },
};

const mockUpdate: MockedResponse = {
  request: {
    query: UpdateCancelDocument,
    variables: {
      input: { _id: '1', status: 'Шилжүүлээгүй' },
    },
  },
  result: {
    data: {
      updateCancel: {
        _id: '1',
        status: 'Шилжүүлээгүй',
      },
    },
  },
};
const mockUpdate1: MockedResponse = {
  request: {
    query: UpdateCancelDocument,
    variables: {
      input: { _id: '1', status: 'Шилжүүлсэн' },
    },
  },
  result: {
    data: {
      updateCancel: {
        _id: '1',
        status: 'Шилжүүлээгүй',
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
