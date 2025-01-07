import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestList } from '@/components/RequestList';
import { Request } from '@/generated';
const mockRequests = [
  {
    _id: '1',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T12:00:00Z',
    employeeId: {
      _id: '123',
      username: 'employee1',
      email: 'employee1@example.com',
      jobTitle: 'Software Engineer',
    },
    endTime: '18:00',
    startTime: '09:00',
    leadEmployeeId: {
      _id: '456',
      username: 'leadEmployee',
      email: 'lead@example.com',
      jobTitle: 'Team Lead',
    },
    requestStatus: 'PENDING', // or 'APPROVED', 'REJECTED'
    requestType: 'REMOTE', // or 'PAID_LEAVE', 'FREE'
    selectedDay: '2024-12-01',
    reason: 'Working from home',
    reasonRefuse: '',
  },
  {
    _id: '2',
    createdAt: '2024-12-02T10:00:00Z',
    updatedAt: '2024-12-02T12:00:00Z',
    employeeId: {
      _id: '789',
      username: 'employee2',
      email: 'employee2@example.com',
      jobTitle: 'Frontend Developer',
    },
    endTime: '17:00',
    startTime: '08:00',
    leadEmployeeId: {
      _id: '456',
      username: 'leadEmployee',
      email: 'lead@example.com',
      jobTitle: 'Team Lead',
    },
    requestStatus: 'APPROVED',
    requestType: 'PAID_LEAVE',
    selectedDay: '2024-12-02',
    reason: 'Vacation',
    reasonRefuse: '',
  },
];
describe('RequestList', () => {
  it('renders the component', async () => {
    const handleClick = () => {
      console.log('component');
    };
    const activeIndex = '1';
    const { getByTestId } = render(<RequestList filteredRequest={mockRequests as Request[]} handleClick={handleClick} activeIndex={activeIndex} />);

    const button = getByTestId('1');
    fireEvent.click(button);
  });
});
