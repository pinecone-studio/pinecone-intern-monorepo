import { CancelComponent } from '@/components/CancelComponent';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllCancelBookingDocument } from '@/generated';

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
});
