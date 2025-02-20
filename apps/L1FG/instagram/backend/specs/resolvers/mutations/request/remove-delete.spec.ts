import { NotificationModel, RequestModel } from 'apps/L1FG/instagram/backend/src/models';
import { removeRequest } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/request/remove-request';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('delete request', () => {
  const mockdata = jest.fn();
  it('delete', async () => {
    (RequestModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockdata);
    (NotificationModel.deleteMany as jest.Mock).mockResolvedValue(null);

    if (!removeRequest) return;

    await removeRequest({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);
  });
});
