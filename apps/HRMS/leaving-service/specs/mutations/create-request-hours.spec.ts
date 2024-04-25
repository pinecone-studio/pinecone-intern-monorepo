import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { createLeaveRequestHours } from '@/graphql/resolvers/mutations';
import { DurationType, LeaveType } from '@/graphql/generated';

jest.mock('../../src/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: '6625e930e488966d7a390e35',
        declinedReasoning: null,
        description: 'lagshin muu baina',
        durationType: "Hour",
        employeeId: 'AJILTANIB2299',
        leaveType: "SHIT_HAPPENED",
        startDate: '2024-04-22T02:52:27.560Z',
        status: 'PENDING',
        superVisor: 'BOSS',
        endHour: 14,
        startHour: 10,
        totalHour: 4,
      })
      .mockRejectedValueOnce(null),
  },
}));

const requestInput = {
  employeeId: 'AJILTANIB2299',
  startDateString: '2024-04-22T02:52:27.560Z',
  endDateString: '2024-04-26T06:52:27.560Z',
  description: 'lagshin muu baina',
  leaveType: LeaveType.ShitHappened,
  superVisor: 'BOSS',
  durationType: DurationType.Hour,
  email: 'amoramgl@gmail.com',
  substitute: 'andad ogov',
};

describe('createLeaveRequestHours', () => {
  it('should create a leave request hours', async () => {
    const result = await createLeaveRequestHours?.({}, { requestInput }, {}, {} as GraphQLResolveInfo)
    expect(result).toEqual({
        _id: '6625e930e488966d7a390e35',
        declinedReasoning: null,
        description: 'lagshin muu baina',
        durationType: DurationType.Hour,
        employeeId: 'AJILTANIB2299',
        leaveType: LeaveType.ShitHappened,
        startDate: '2024-04-22T02:52:27.560Z',
        status: 'PENDING',
        superVisor: 'BOSS',
        endHour: 14,
        startHour: 10,
        totalHour: 4,
    });
  });

  it('should throw error', async () => {
    try {
      await createLeaveRequestHours?.({}, { requestInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Bolsonguie' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
