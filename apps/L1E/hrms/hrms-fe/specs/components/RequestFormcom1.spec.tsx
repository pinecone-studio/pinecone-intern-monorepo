import { render, fireEvent, screen, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CreateRequestDocument } from '@/generated';
import RequestcomDay1 from '@/components/requestForm/RequestFormcom1';

const createRequestMock: MockedResponse = {
  request: {
    query: CreateRequestDocument,
    variables: {
      input: {
        selectedDay: 'Sun Dec 29 2024',
        startTime: '08:00',
        endTime: '17:00',
        leadEmployeeId: '676e4d0d33fccb9fd4362ef2',
        requestStatus: 'FREE',
        reason: 'Annual leave',
        employeeId: '676e4cd433fccb9fd4362ef0',
      },
    },
  },
  result: {
    data: {
      createRequest: {
        selectedDay: 'Sun Dec 29 2024',
        startTime: '08:00',
        endTime: '17:00',
        leadEmployeeId: '676e4d0d33fccb9fd4362ef2',
        requestStatus: 'FREE',
        reason: 'Annual leave',
        employeeId: '676e4cd433fccb9fd4362ef0',
      },
    },
  },
};
describe('RequestcomDay1', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('submits data and calls createRequest mutation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <RequestcomDay1 />
      </MockedProvider>
    );
    const calendarBtn = getByTestId('calendar-btn');
    fireEvent.click(calendarBtn);
    const day29 = await screen.findByText('29');
    fireEvent.click(day29);

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
