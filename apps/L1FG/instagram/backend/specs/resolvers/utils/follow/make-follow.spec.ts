/* eslint-disable @nx/enforce-module-boundaries */
import { Follow } from 'apps/L1FG/instagram/backend/src/generated';
import { FollowerModel, NotificationModel } from 'apps/L1FG/instagram/backend/src/models';
import { makeFollow } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/make-follow';
jest.mock('apps/L1FG/instagram/backend/src/models');
const newFollow: Follow = {
  _id: '12',
  followerId: '134',
  targetId: '1134',
};
describe('Make a follow', () => {
  it('Should throw an error that says failed to follow', async () => {
    const mockCreate = jest.fn().mockResolvedValueOnce(null);
    (FollowerModel.create as jest.Mock) = mockCreate;
    await expect(makeFollow('13', '14')).rejects.toThrow('Failed to follow');
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
  it('SHould follow', async () => {
    const mockCreate = jest.fn().mockResolvedValueOnce(newFollow);
    (FollowerModel.create as jest.Mock) = mockCreate;
    (NotificationModel.create as jest.Mock).mockResolvedValue({ userId: '123', ownerId: '321', categoryType: 'REQUEST' });
    const result = await makeFollow('13', '14');
    expect(result).toEqual(newFollow);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
