/*eslint-disable*/
import { Gender } from 'apps/L1FG/instagram/backend/src/generated';
import { createPost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { addPostToDatabase, updatePostCreator, validatePost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-utils';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-utils');
describe('create post', () => {
  it('Should throw an authorization error', async () => {
    if (!createPost) {
      return;
    }
    (authenticate as jest.Mock).mockImplementation(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    const input = {
      postImage: [],
      caption: '',
    };
    await expect(createPost({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });

  it('Should throw an post creator not found error', async () => {
    if (!createPost) {
      return;
    }
    (authenticate as jest.Mock).mockResolvedValueOnce(null);
    (validatePost as jest.Mock).mockImplementation(() => {
      throw new Error('Пост үүсгэгч олдсонгүй');
    });
    const input = {
      caption: 'hi',
      postImage: ['http:/image', 'http:/image1'],
    };
    await expect(createPost({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('Пост үүсгэгч олдсонгүй');
  });
  it('Should throw an carouselMediaCount error', async () => {
    if (!createPost) {
      return;
    }
    (authenticate as jest.Mock).mockResolvedValueOnce(null);
    (validatePost as jest.Mock).mockImplementation(() => {
      throw new Error('10 аас дээш зураг авч болохгүй');
    });
    const input = {
      postImage: ['1', '2'],
      caption: '',
    };
    await expect(createPost({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('10 аас дээш зураг авч болохгүй');
  });
  it('Should throw an post creation error', async () => {
    if (!createPost) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidatePost = jest.fn().mockResolvedValueOnce({
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
    });
    const mockAddPostToDatabase = jest.fn().mockResolvedValueOnce({
      _id: '6799df7cf49554350497415b',
      caption: 'hi',
      carouselMediaCount: 2,
      createdAt: '2024-10-24',
      postImage: ['image', 'image'],
      userId: '234',
    });
    const mockUpdatePostCreator = jest.fn(() => {
      throw new Error('Failed to create a post');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (addPostToDatabase as jest.Mock) = mockAddPostToDatabase;
    (validatePost as jest.Mock) = mockValidatePost;
    (updatePostCreator as jest.Mock) = mockUpdatePostCreator;
    const input = {
      postImage: ['1', '2'],
      caption: '',
    };
    await expect(createPost({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to create a post');
    expect(mockAuthenticate).toHaveBeenCalledWith('12');
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockValidatePost).toHaveBeenCalledWith('12', input);
    expect(mockValidatePost).toHaveBeenCalledTimes(1);
    expect(mockAddPostToDatabase).toHaveBeenCalledTimes(1);
    expect(mockAddPostToDatabase).toHaveBeenCalledWith('12', input);
    expect(mockUpdatePostCreator).toHaveBeenCalledWith(
      '12',
      {
        _id: '6799df7cf49554350497415b',
        caption: 'hi',
        carouselMediaCount: 2,
        createdAt: '2024-10-24',
        postImage: ['image', 'image'],
        userId: '234',
      },
      {
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
      }
    );
  });
  it('Should create a post', async () => {
    if (!createPost) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidatePost = jest.fn().mockResolvedValueOnce({});
    const mockAddPostToDatabase = jest.fn().mockResolvedValueOnce({
      _id: '6799df7cf49554350497415b',
      caption: 'hi',
      carouselMediaCount: 2,
      createdAt: '2024-10-24',
      postImage: ['image', 'image'],
      userId: '234',
    });
    const mockUpdatePostCreator = jest.fn().mockResolvedValueOnce(null);
    (authenticate as jest.Mock) = mockAuthenticate;
    (addPostToDatabase as jest.Mock) = mockAddPostToDatabase;
    (validatePost as jest.Mock) = mockValidatePost;
    (updatePostCreator as jest.Mock) = mockUpdatePostCreator;
    const input = {
      postImage: ['1', '2'],
      caption: '',
    };
    const result = await createPost({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '6799df7cf49554350497415b',
      caption: 'hi',
      carouselMediaCount: 2,
      createdAt: '2024-10-24',
      postImage: ['image', 'image'],
      userId: '234',
    });
  });
});
