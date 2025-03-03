import { NotificationModel, RequestModel } from '../../../../src/models';
import { removeRequest } from '../../../../src/resolvers/mutations/request/remove-request';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

describe('delete request', () => {
  const mockdata = jest.fn();
  it('delete', async () => {
    (RequestModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockdata);
    (NotificationModel.deleteMany as jest.Mock).mockResolvedValue(null);

    if (!removeRequest) return;

    await removeRequest({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);
  });
});
