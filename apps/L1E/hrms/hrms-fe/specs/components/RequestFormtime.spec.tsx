import { render, fireEvent, screen, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import RequestcomTime1 from '@/components/requestForm/RequestFormtime';
import { CreateRequestDocument } from '@/generated';

const createRequestMock: MockedResponse = {
  request: {
    query: CreateRequestDocument,
    variables: {
      input: {
        selectedDay: 'Sat Dec 28 2024 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
        startTime: '08:00',
        endTime: '09:00',
        leadEmployeeId: '6763e5e51439bd616d57745d',
        requestStatus: 'FREE',
        reason: 'Annual leave',
        employeeId: '6763e2c6d93130a1f7a36953',
      },
    },
  },
  result: {
    data: {
      createRequest: {
        selectedDay: 'Sat Dec 28 2024 00:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
        startTime: '08:00',
        endTime: '09:00',
        leadEmployeeId: '6763e5e51439bd616d57745d',
        requestStatus: 'FREE',
        reason: 'Annual leave',
        employeeId: '6763e2c6d93130a1f7a36953',
      },
    },
  },
};
describe('RequestcomTime1', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('submits data and calls createRequest mutation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <RequestcomTime1 />
      </MockedProvider>
    );
    const calendarBtn = getByTestId('calendar-btn');
    fireEvent.click(calendarBtn);
    const day28 = await screen.findByText('28');
    fireEvent.click(day28);

    const startTimeSelectTrigger = getByTestId('starttime-select');
    fireEvent.keyDown(startTimeSelectTrigger, { key: 'ArrowDown' });
    const startTimeOption = screen.getByTestId('09:00');
    fireEvent.click(startTimeOption);

    const endtime = getByTestId('end-time');
    fireEvent.keyDown(endtime, { key: 'ArrowDown' });
    const endtimeOption = await screen.getByTestId('10');
    fireEvent.click(endtimeOption);

    const leadBtn = getByTestId('lead-button');
    fireEvent.keyDown(leadBtn, { key: 'ArrowDown' });
    const selectlead = getByTestId('Option-1');
    fireEvent.keyDown(selectlead, { key: 'Enter' });

    fireEvent.change(getByTestId('notes-input'), { target: { value: 'Annual leave' } });

    const submitBtn = getByTestId('submit-button');

    await act(async () => {
      fireEvent.click(submitBtn);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

  });
});
