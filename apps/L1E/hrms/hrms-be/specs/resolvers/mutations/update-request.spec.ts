import { updateRequest } from '../../../src/resolvers/mutations';
import { RequestType, RequestUpdateInput } from '../../../src/generated';

jest.mock('../../../src/models', () => ({
  RequestModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        requestStatus: 'FREE',
        employeeId: '12',
      })
      .mockReturnValueOnce({
        id: '1',
        requestStatus: 'REMOTE',
        employeeId: '12',
      })
      .mockReturnValueOnce({
        id: '1',
        requestStatus: 'PAID_LEAVE',
        employeeId: '12',
      }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValueOnce({
        employeeId: { name: 'test12' },
        leadEmployeeId: { name: 'test2' },
        requestType: 'Approved',
        reasonRefuse: 'Developer',
        updatedAt: '2025-01-01',
      }),
    }),
  },
  EmployeeModel: {
    findById: jest.fn().mockResolvedValue({
      id: '12',
      freeLimit: 5,
      paidLeaveLimit: 3,
      remoteLimit: 2,
    }),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateRequest Resolver', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-01-01').getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should successfully update a request', async () => {
    const mockInput: RequestUpdateInput = {
      requestType: RequestType.Approved,
      reasonRefuse: 'Developer',
      updatedAt: '2025-01-01',
    };

    await updateRequest({}, { input: mockInput, id: '1' });
  });

  it('should handle employee limit updates correctly', async () => {
    const mockInput: RequestUpdateInput = {
      requestType: RequestType.Approved,
      reasonRefuse: 'Developer',
      updatedAt: '2025-01-01',
    };

    await updateRequest({}, { input: mockInput, id: '1' });
  });

  it('should handle employee limit updates correctly', async () => {
    const mockInput: RequestUpdateInput = {
      requestType: RequestType.Approved,
      reasonRefuse: 'Developer',
      updatedAt: '2025-01-01',
    };

    await updateRequest({}, { input: mockInput, id: '1' });
  });
});
