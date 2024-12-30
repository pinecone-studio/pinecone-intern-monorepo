import RequestcomPaid from '@/components/requestForm/RequestFormPaid';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CreateRequestDocument, Employee, EmployeeStatus } from '@/generated';
const mockLeads: Employee[] = [
  {
    _id: '676e6dd407d5ae05a35cda84',
    adminStatus: true,
    email: 'lead1@example.com',
    employeeStatus: EmployeeStatus.Lead, 
    freeLimit: 10,
    jobTitle: 'Lead Developer',
    paidLeaveLimit: 20,
    remoteLimit: 5,
    username: 'Lead 1',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-01',
  },
  {
    _id: '676e6dd407d5ae05a35cda85',
    adminStatus: false,
    email: 'lead2@example.com',
    employeeStatus: EmployeeStatus.Lead,
    freeLimit: 15,
    jobTitle: 'Lead Designer',
    paidLeaveLimit: 25,
    remoteLimit: 8,
    username: 'Lead 2',
    createdAt: '2022-05-15',
    updatedAt: '2023-07-12',
  },
];
const createRequestMock: MockedResponse = {
  request: {
    query: CreateRequestDocument,
    variables: {
      input: {
        selectedDay: 'Tue Dec 31 2024',
        startTime: '00:00',
        endTime: '24:00',
        leadEmployeeId: '676e6dd407d5ae05a35cda84',
        requestStatus: 'PAID_LEAVE',
        reason: 'Annual leave',
        employeeId: '676e6e4007d5ae05a35cda9e',
      },
    },
  },
  result: {
    data: {
      createRequest: {
        selectedDay: 'Tue Dec 31 2024',
        startTime: '00:00',
        endTime: '24:00',
        leadEmployeeId: '676e6dd407d5ae05a35cda84',
        requestStatus: 'PAID_LEAVE',
        reason: 'Annual leave',
        employeeId: '676e6e4007d5ae05a35cda9e',
      },
    },
  },
};
describe('should RequestcomPaid', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('submits data and calls createRequest mutation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <RequestcomPaid leads={mockLeads} />
      </MockedProvider>
    );
    const calendarBtn = getByTestId('calendar-btn');
    fireEvent.click(calendarBtn);
    const day31 = await screen.findByText('31');
    fireEvent.click(day31);

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
