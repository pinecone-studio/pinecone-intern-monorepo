import { render, fireEvent, screen, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import RequestcomTime1 from '@/components/requestForm/RequestFormtime';
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
        startTime: '08:00',
        endTime: '09:00',
        leadEmployeeId: '676e6dd407d5ae05a35cda84',
        requestStatus: 'FREE',
        reason: 'Annual leave',
        employeeId: '676e6e4007d5ae05a35cda9e',
      },
    },
  },
  result: {
    data: {
      createRequest: {
        selectedDay: 'Tue Dec 31 2024',
        startTime: '08:00',
        endTime: '09:00',
        leadEmployeeId: '676e6dd407d5ae05a35cda84',
        requestStatus: 'FREE',
        reason: 'Annual leave',
        employeeId: '676e6e4007d5ae05a35cda9e',
      },
    },
  },
};
const mockEmployee: Employee = {
  _id: '676e6e4007d5ae05a35cda9e',
  email: 'shagai@gmail.com',
  jobTitle: 'junior',
  username: 'shagai',
  adminStatus: false,
  remoteLimit: 5,
  paidLeaveLimit: 5,
  freeLimit: 5,
  employeeStatus: EmployeeStatus.Employee,
  createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
  updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
};
describe('RequestcomTime1', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('submits data and calls createRequest mutation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <RequestcomTime1 leads={mockLeads} employee={mockEmployee} />
      </MockedProvider>
    );
    const calendarBtn = getByTestId('calendar-btn');
    fireEvent.click(calendarBtn);
    const day31 = await screen.findByText('31');
    fireEvent.click(day31);

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
