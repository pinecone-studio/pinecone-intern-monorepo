import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestApproved } from '@/components/RequestApproved';
import { EmployeeStatus, Request, RequestStatus, RequestType } from '@/generated';
const mockRequests: Request[] = [
  {
    _id: '677249a6197305d06f1db185',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T12:00:00Z',
    employeeId: {
      _id: '676e6dd407d5ae05a35cda84',
      adminStatus: true,
      email: 'lead1@example.com',
      employeeStatus: EmployeeStatus.Lead,
      freeLimit: 10,
      jobTitle: 'Lead Developer',
      paidLeaveLimit: 20,
      remoteLimit: 5,
      username: 'Lead 1',
      createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
      updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
    },
    endTime: '18:00',
    startTime: '09:00',
    leadEmployeeId: {
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
    },
    requestStatus: RequestStatus.Free,
    requestType: RequestType.Pending,
    selectedDay: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
    reason: 'Working from home',
    reasonRefuse: '',
  },
  {
    _id: '677249a6197305d06f1db181',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T12:00:00Z',
    employeeId: {
      _id: '676e6dd407d5ae05a35cda84',
      adminStatus: true,
      email: 'lead1@example.com',
      employeeStatus: EmployeeStatus.Lead,
      freeLimit: 10,
      jobTitle: 'Lead Developer',
      paidLeaveLimit: 20,
      remoteLimit: 5,
      username: 'Lead 1',
      createdAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
      updatedAt: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
    },
    endTime: '18:00',
    startTime: '09:00',
    leadEmployeeId: {
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
    },
    requestStatus: RequestStatus.Free,
    requestType: RequestType.Approved,
    selectedDay: 'Fri Dec 27 2024 17:07:12 GMT+0800 (Ulaanbaatar Standard Time)',
    reason: 'Working from home',
    reasonRefuse: '',
  },
];
describe('RequestApproved', () => {
  it('renders the component', async () => {
    const { getByTestId } = render(
      <RequestApproved
        selectId={'677249a6197305d06f1db185'}
        buttonApprove={() => {
          console.log('');
        }}
        buttonReject={() => {
          console.log('');
        }}
        isOpenModalConfirm={false}
        onCloseConfirm={() => {
          console.log('');
        }}
        onConfirm={() => {
          console.log('');
        }}
        isOpenModalRefuse={false}
        onCloseRefuse={() => {
          console.log('');
        }}
        setRefuseValue={() => {
          console.log('');
        }}
        onRefuse={() => {
          console.log('');
        }}
        filteredRequest={mockRequests}
      />
    );
    const buttonReject = getByTestId('buttonReject');
    fireEvent.click(buttonReject);
    const buttonApprove = getByTestId('buttonApprove');
    fireEvent.click(buttonApprove);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('renders the component', async () => {
    const { getByTestId } = render(
      <RequestApproved
        selectId={'677249a6197305d06f1db181'}
        buttonApprove={() => {
          console.log('');
        }}
        buttonReject={() => {
          console.log('');
        }}
        isOpenModalConfirm={false}
        onCloseConfirm={() => {
          console.log('');
        }}
        onConfirm={() => {
          console.log('');
        }}
        isOpenModalRefuse={false}
        onCloseRefuse={() => {
          console.log('');
        }}
        setRefuseValue={() => {
          console.log('');
        }}
        onRefuse={() => {
          console.log('');
        }}
        filteredRequest={mockRequests}
      />
    );
    const buttonReject = getByTestId('buttonReject');
    fireEvent.click(buttonReject);
    const buttonApprove = getByTestId('buttonApprove');
    fireEvent.click(buttonApprove);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
