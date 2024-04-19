import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { createLeaveRequestHours } from '@/graphql/resolvers/mutations';
import { LeaveRequestModel } from '@/graphql/model/leave-request';
const requestInput = {
  employeeId:"123",
  startDateString: "2024-04-22T02:52:27.56Z",
  endDateString:"2024-04-26T06:52:27.56Z", 
  description:"lagshin muu baina", 
  leaveType:"SHIT_HAPPENED", 
  superVisor:"BOSS", 
  durationType:"Hour",
  declinedReasoning: ""
};
 
jest.mock("", () => {
  LeaveRequestModel:{
    create: jest.fn().mockReturnValueOnce({}).mockRejectedValueOnce(null)
  }
})
 
describe('should create leaves request hours', () => {
  it('should create a user', async () => {
    const result = await createLeaveRequestHours!({}, { requestInput }, {}, {} as GraphQLResolveInfo);
 
    expect(result).toEqual({
      requestInput
    });
  });
 
 
  it('should throw error', async () => {
    try {
      await createLeaveRequestHours!({}, { requestInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Bolsonguie' }, errorTypes.BAD_REQUEST));
    }
  });
});