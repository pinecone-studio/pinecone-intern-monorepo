import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { createLeaveRequestDays } from '@/graphql/resolvers/mutations';
import { DurationType, LeaveType } from '@/graphql/generated';

jest.mock('../../src/mail/mail-sender', () => ({
  sendMail: jest.fn(),
}));

jest.mock('../../src/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: '66260763e488966d7a390e43',
        name: "WorkerName",
        declinedReasoning: null,
        description: 'lagshin muu baina',
        durationType: 'Day',
        employeeId: 'AJILTANIB2299',
        leaveType: 'SHIT_HAPPENED',
        endHour: null,
        startDate: '2024-04-26T02:52:27.560Z',
        startHour: null,
        status: 'PENDING',
        superVisor: 'BOSS',
        totalHour: 8,
      })
      .mockRejectedValueOnce(null),
  },
}));

const requestInput = {
  employeeId: 'AJILTANIB2299',
  name: "WorkerName",
  startDateString: '2024-04-26T02:52:27.560Z',
  endDateString: '2024-04-28T06:52:27.560Z',
  description: 'lagshin muu baina',
  leaveType: LeaveType.ShitHappened,
  superVisor: 'BOSS',
  durationType: DurationType.Day,
  email: 'amoramgl@gmail.com',
  substitute: 'andad ogov',
};

describe('createLeaveRequestDays', () => {
  it('should create a leave request days', async () => {
    const result = await createLeaveRequestDays?.({}, { requestInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '66260763e488966d7a390e43',
        name: "WorkerName",
        declinedReasoning: null,
        description: 'lagshin muu baina',
        durationType: 'Day',
        employeeId: 'AJILTANIB2299',
        leaveType: 'SHIT_HAPPENED',
        endHour: null,
        startDate: '2024-04-26T02:52:27.560Z',
        startHour: null,
        status: 'PENDING',
        superVisor: 'BOSS',
        totalHour: 8,
      },
    ]);
  });

  it('should throw error', async () => {
    try {
      await createLeaveRequestDays?.({}, { requestInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Bolsonguie' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});