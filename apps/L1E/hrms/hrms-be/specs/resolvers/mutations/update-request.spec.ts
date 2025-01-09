import { updateRequest } from '../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import { RequestType, RequestUpdateInput } from '../../../src/generated';

jest.mock('../../../src/models', () => ({
  RequestModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce({ id: '1', employeeId: { name: 'test1' }, leadEmployeeId: { name: 'test1' }, requestType: 'Pending', reasonRefuse: 'Developer', updatedAt: '11' })
        .mockResolvedValueOnce(null),
    }),
  },
}));

describe('updateRequest Resolver', () => {
  it('should update a updateRequest ', async () => {
    const mockinput: RequestUpdateInput = {
      requestType: RequestType.Pending,
      reasonRefuse: 'Developer',
      updatedAt: '11',
    };
    const context = {
      req: {
        user: { id: '1' },
      },
    };
    const result = await updateRequest!({}, { input: mockinput, id: '1' }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
      employeeId: { name: 'test1' },
      leadEmployeeId: { name: 'test1' },
      requestType: 'Pending',
      reasonRefuse: 'Developer',
      updatedAt: '11',
    });
  });
});
