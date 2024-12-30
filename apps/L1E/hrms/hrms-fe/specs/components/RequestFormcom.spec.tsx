import { act, fireEvent, render } from '@testing-library/react';
import Requestcom from '@/components/requestForm/RequestFormcom';
import { Employee, EmployeeStatus } from '@/generated';

jest.mock('../../src/components/requestForm/RequestFormcom1', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Day Component</div>),
}));

jest.mock('../../src/components/requestForm/RequestFormtime', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Time Component</div>),
}));
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

describe('Requestcom', () => {
  it('should Requestcom', async () => {
   const {getByTestId}=render(<Requestcom leads={mockLeads} employee={mockEmployee}/>);
    const timeBtn = getByTestId('time-btn');
    await act(() => {
      fireEvent.click(timeBtn);
    });

    const dayBtn = getByTestId('day-btn');
    await act(() => {
      fireEvent.click(dayBtn);
    });
    
 
  });
});
