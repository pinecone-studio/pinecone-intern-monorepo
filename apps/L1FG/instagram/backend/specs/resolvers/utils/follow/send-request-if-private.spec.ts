/* eslint-disable @nx/enforce-module-boundaries */
import { Gender, Request, User } from 'apps/L1FG/instagram/backend/src/generated';
import { NotificationModel, RequestModel } from 'apps/L1FG/instagram/backend/src/models';
import { sendRequestIfPrivate } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/send-request-if-private';
jest.mock('apps/L1FG/instagram/backend/src/models');
const targetUser: User = {
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
const privateTargetUser: User = {
  _id: '14',
  userName: 'mike',
  fullName: 'mike mack',
  email: 'mike@gmail.com',
  bio: 'builder',
  password: '1235',
  isPrivate: true,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 2,
  followerCount: 2,
  postCount: 2,
};
const foundRequest: Request = {
  _id: '12',
  from: '2342',
  to: '234',
  status: 'PENDING',
};
const newRequest: Request = {
  _id: '23',
  from: '134',
  to: '342',
  status: 'PENDING',
};
const Requested = {
  isFollowed: false,
  isRequested: true,
};
describe('Send request if private', () => {
  it('Should return null', async () => {
    const result = await sendRequestIfPrivate(targetUser, '13', '14');
    expect(result).toBeNull();
  });
  it('Should throw en error that request has already been made', async () => {
    const mockFindOne = jest.fn().mockResolvedValueOnce(foundRequest);
    (RequestModel.findOne as jest.Mock) = mockFindOne;
    await expect(sendRequestIfPrivate(privateTargetUser, '13', '14')).rejects.toThrow('Request has already made');
    expect(mockFindOne).toHaveBeenCalledWith({
      from: '13',
      to: '14',
    });
    expect(mockFindOne).toHaveBeenCalledTimes(1);
  });
  it('Should throw an error that says failed to request', async () => {
    const mockFindOne = jest.fn().mockResolvedValueOnce(null);
    const mockCreate = jest.fn().mockResolvedValueOnce(null);
    (RequestModel.create as jest.Mock) = mockCreate;

    (RequestModel.findOne as jest.Mock) = mockFindOne;
    await expect(sendRequestIfPrivate(privateTargetUser, '13', '14')).rejects.toThrow('Failed to request');
    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockFindOne).toHaveBeenCalledWith({
      from: '13',
      to: '14',
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
  it('Should make a request', async () => {
    const mockFindOne = jest.fn().mockResolvedValueOnce(null);
    const mockCreate = jest.fn().mockResolvedValueOnce(newRequest);
    (RequestModel.create as jest.Mock) = mockCreate;
    (NotificationModel.create as jest.Mock).mockResolvedValue({ userId: '123', ownerId: '321', categoryType: 'REQUEST' });
    (RequestModel.findOne as jest.Mock) = mockFindOne;
    const result = await sendRequestIfPrivate(privateTargetUser, '13', '14');
    expect(result).toEqual(Requested);
    expect(mockFindOne).toHaveBeenCalledTimes(1);
    expect(mockFindOne).toHaveBeenCalledWith({
      from: '13',
      to: '14',
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
