import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestList } from '@/components/RequestList';
import { Request } from '@/generated';
const mockRequest = [
  {
    _id: '677249a6197305d06f1db185',
    employeeId: '676e6de507d5ae05a35cda88',
    leadEmployeeId: '676e6dec07d5ae05a35cda8a',
    requestStatus: '',
    requestType: 'PENDING',
    reason: 'remote test',
    reasonRefuse: '',
    selectedDay: '2024-12-30T16:00:00.000Z',
    startTime: '00:00',
    endTime: '24:00',
    updatedAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
    createdAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
  },
  {
    _id: '6772551fa009a9bf378d99eb',
    employeeId: '676e6de507d5ae05a35cda88',
    leadEmployeeId: '676e6de507d5ae05a35cda88',
    requestStatus: 'FREE',
    requestType: 'PENDING',
    reason: 'dfgadgsdfg',
    reasonRefuse: '',
    selectedDay: new Date(2024, 11, 29),
    startTime: '09:00',
    endTime: '10:00',
    updatedAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
    createdAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
  },
];

describe('RequestList', () => {
  it('renders the component', async () => {
    const handleChange = () => {
      console.log('component');
    };
    const { getByTestId } = render(<RequestList setSelectId={handleChange} filteredRequest={mockRequest as Request[]} />);

    const button = getByTestId('677249a6197305d06f1db185');
    fireEvent.click(button);
  });
});
