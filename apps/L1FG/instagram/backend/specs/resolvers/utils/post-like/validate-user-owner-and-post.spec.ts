import { PostModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { validateUserOwnerAndPost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/validate-user-owner-and-post';

jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Validate user owner and post', () => {
  it('Should throw user not found error', async () => {
    const mockUserFindById = jest.fn().mockResolvedValueOnce(null);
    (UserModel.findById as jest.Mock) = mockUserFindById;
    const input = {
      userId: '1',
      ownerUserId: '2',
      postId: '3',
    };
    await expect(validateUserOwnerAndPost({ input: input })).rejects.toThrow('хэрэглэгч олдсонгүй');
    expect(mockUserFindById).toHaveBeenCalledWith('1');
  });
  it('SHould throw owner not found error', async () => {
    const mockUserFindById = jest.fn().mockResolvedValueOnce({ _id: '34', userName: 'john' }).mockResolvedValueOnce(null);
    (UserModel.findById as jest.Mock) = mockUserFindById;
    const input = {
      userId: '1',
      ownerUserId: '2',
      postId: '3',
    };
    await expect(validateUserOwnerAndPost({ input: input })).rejects.toThrow('постны эзэмшигч олдсонгүй');
    expect(mockUserFindById).toHaveBeenCalledTimes(2);
    expect(mockUserFindById).toHaveBeenCalledWith('1');
  });
  it('Should throw post not found error', async () => {
    const mockUserFindById = jest.fn().mockResolvedValue({ _id: '34', userName: 'john' });
    const mockPostFindById = jest.fn().mockResolvedValueOnce(null);
    (UserModel.findById as jest.Mock) = mockUserFindById;
    (PostModel.findById as jest.Mock) = mockPostFindById;
    const input = {
      userId: '1',
      ownerUserId: '2',
      postId: '3',
    };
    await expect(validateUserOwnerAndPost({ input: input })).rejects.toThrow('пост олдсонгүй');
    expect(mockUserFindById).toHaveBeenCalledTimes(2);
    expect(mockPostFindById).toHaveBeenCalledTimes(1);
  });
});
