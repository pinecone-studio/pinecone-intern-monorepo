import { Gender } from 'apps/L1FG/instagram/backend/src/generated';
import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { validatePost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-utils';

jest.mock('apps/L1FG/instagram/backend/src/models');
const user = {
  _id: '14',
  userName: 'mike',
  fullName: 'mike mack',
  email: 'mike@gmail.com',
  bio: 'builder',
  password: '1235',
  isPrivate: false,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 2,
  followerCount: 2,
  postCount: 2,
};
describe('Create post utils', () => {
  it('Should throw post creator not found error', async () => {
    const mockFindById = jest.fn().mockResolvedValue(null);
    UserModel.findById = mockFindById;
    await expect(
      validatePost('123', {
        caption: 'this is title',
        postImage: ['image1', 'image2'],
      })
    ).rejects.toThrow('Пост үүсгэгч олдсонгүй');
    expect(mockFindById).toHaveBeenCalledWith('123');
  });
  it('Should throw 10 more images error', async () => {
    (UserModel.findById as jest.Mock).mockResolvedValue(user);
    await expect(
      validatePost('123', {
        caption: 'this is title',
        postImage: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9', 'image10', 'image11'],
      })
    ).rejects.toThrow('10 аас дээш зураг авч болохгүй');
  });
  it('SHould return post creator', async () => {
    (UserModel.findById as jest.Mock).mockResolvedValue(user);
    const result = await validatePost('123', {
      caption: 'this is title',
      postImage: ['image1', 'image2'],
    });
    expect(result).toEqual(user);
  });
});
