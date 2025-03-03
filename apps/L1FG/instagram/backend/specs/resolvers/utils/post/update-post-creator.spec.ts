import { Gender, Post, User } from '../../../../src/generated';
import { UserModel } from '../../../../src/models';
import { updatePostCreator } from '../../../../src/resolvers/mutations/post/create-post-utils';

const postCreator: User = {
  _id: '13',
  userName: 'john',
  fullName: 'john mack',
  email: 'john@gmail.com',
  bio: 'nurse',
  password: '123',
  isPrivate: false,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 1,
  followerCount: 1,
  postCount: 1,
};
const updatedPostCreator: User = {
  _id: '13',
  userName: 'john',
  fullName: 'john mack',
  email: 'john@gmail.com',
  bio: 'nurse',
  password: '123',
  isPrivate: false,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 1,
  followerCount: 1,
  postCount: 2,
};
const newPost: Post = {
  _id: '6799df7cf49554350497415b',
  caption: 'hi',
  carouselMediaCount: 2,
  createdAt: '20244-10-24',
  postImage: ['image', 'image'],
  userId: '234',
};
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Update post creator', () => {
  it('Should try three times (null,null,null)', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(null).mockResolvedValueOnce(null).mockResolvedValueOnce(updatedPostCreator);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updatePostCreator('ad', newPost, postCreator)).rejects.toThrow('Failed to create a post');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
  it('Should try three three times(postCreator,postCreator,postCreator)', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(postCreator).mockResolvedValueOnce(postCreator).mockResolvedValueOnce(postCreator).mockResolvedValueOnce(updatedPostCreator);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updatePostCreator('ad', newPost, postCreator)).rejects.toThrow('Failed to create a post');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
  it('Should try two times (null,updatedPostCreator)', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(postCreator).mockResolvedValueOnce(updatedPostCreator);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await updatePostCreator('ad', newPost, postCreator);
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(2);
  });
});
