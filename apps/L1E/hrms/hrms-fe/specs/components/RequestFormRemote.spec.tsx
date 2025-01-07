import Requestcomremote from '@/components/requestForm/RequestFormRemote';
import { render, fireEvent } from '@testing-library/react';
import { Employee, EmployeeStatus } from '@/generated';
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
const employee: Employee = {
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
const mockOnSubmit = jest.fn(async () => {
  return Promise.resolve();
});
const isOpen = true; //
describe('should RequestcomRemote', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('submits data and calls createRequest mutation', async () => {
    const { getByTestId } = render(<Requestcomremote leads={mockLeads} isOpen={isOpen} employee={employee} onSubmit={mockOnSubmit} />);
    const calendarBtn = getByTestId('calendar-btn');
    fireEvent.click(calendarBtn);
  });
});
