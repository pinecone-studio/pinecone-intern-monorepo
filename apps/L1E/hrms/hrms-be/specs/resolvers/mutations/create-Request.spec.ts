import { createRequest } from '../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import { RequestStatus } from '../../../src/generated';
jest.mock('../../../src/models', () => ({
  RequestModel: {
    create: jest.fn().mockReturnValue({
      employeeId: '123',
      leadEmployeeId: '456',
      requestStatus: 'FREE',
      reason: 'Vacation',
      reasonRefuse: '',
      startTime: '2024-01-01T09:00:00Z',
      endTime: '2024-01-10T18:00:00Z',
    }),
  },
  EmployeeModel: {
    findById: jest.fn().mockResolvedValue({
      _id: '123',
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: 'Employee',
      createdAt: new Date(),
    }),
  },
}));

describe('createRequest Resolver', () => {
  const input = {
    employeeId: '123',
    leadEmployeeId: '456',
    requestStatus: RequestStatus.Free,
    reason: 'Vacation',
    reasonRefuse: '',
    startTime: '2024-01-01T09:00:00Z',
    endTime: '2024-01-10T18:00:00Z',
  };
  const context = {
    req: {
      user: { _id: '1' },
    },
  };
  it('should create a author', async () => {
    const result = await createRequest!({}, { input }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      employeeId: '123',
      leadEmployeeId: '456',
      requestStatus: 'FREE',
      reason: 'Vacation',
      reasonRefuse: '',
      startTime: '2024-01-01T09:00:00Z',
      endTime: '2024-01-10T18:00:00Z',
    });
  });
});
