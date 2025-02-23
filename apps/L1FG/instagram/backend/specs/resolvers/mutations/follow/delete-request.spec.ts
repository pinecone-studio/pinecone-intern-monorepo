import { NotificationModel, RequestModel } from 'apps/L1FG/instagram/backend/src/models';
import { deleteRequest } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('delete request', () => {
  const mockdata = jest.fn();
  it('delete', async () => {
    (RequestModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockdata);
    (NotificationModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    if (!deleteRequest) return;

    const result = await deleteRequest({}, { targetId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      isFollowed: false,
      isRequested: false,
    });
  });
});
