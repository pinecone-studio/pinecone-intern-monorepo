import { GraphQLResolveInfo } from 'graphql';
import { friendshipStatus } from '../../../../src/resolvers/follow/following-user-type';
import { FollowerModel, RequestModel } from '../../../../src/models';
import { Gender } from '../../../../src/generated';

jest.mock('apps/L1FG/instagram/backend/src/models');
describe('FreindshipStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should give friend statuses', async () => {
    (FollowerModel.findOne as jest.Mock).mockResolvedValue({
      _id: '1',
      followerId: 'fid',
      targetId: 'tar1',
    });
    (RequestModel.findOne as jest.Mock).mockResolvedValue({
      _id: '2',
      from: '34',
      to: 'if',
      status: 'PENDING',
    });
    if (!friendshipStatus) {
      return;
    }
    const parent = {
      _id: '3',
      userName: '',
      fullName: '',
      bio: '',
      profileImage: '',
      gender: Gender.Male,
      isPrivate: true,
      email: '',
      friendshipStatus: {
        following: true,
        incomingRequest: true,
        outgoingRequest: true,
        followedBy: true,
      },
    };
    const result = await friendshipStatus(parent, {}, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      following: true,
      incomingRequest: true,
      outgoingRequest: true,
      followedBy: true,
    });
  });
  it('Should give friend statuses false', async () => {
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (RequestModel.findOne as jest.Mock).mockResolvedValue(null);
    if (!friendshipStatus) {
      return;
    }
    const parent = {
      _id: '3',
      userName: '',
      fullName: '',
      bio: '',
      profileImage: '',
      gender: Gender.Male,
      isPrivate: true,
      email: '',
      friendshipStatus: {
        following: true,
        incomingRequest: true,
        outgoingRequest: true,
        followedBy: true,
      },
    };
    const result = await friendshipStatus(parent, {}, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      following: false,
      incomingRequest: false,
      outgoingRequest: false,
      followedBy: false,
    });
  });
  it('Should give manual promise if userId equal to _id', async () => {
    (FollowerModel.findOne as jest.Mock).mockResolvedValue({
      _id: '1',
      followerId: 'fid',
      targetId: 'tar1',
    });
    (RequestModel.findOne as jest.Mock).mockResolvedValue({
      _id: '2',
      from: '34',
      to: 'if',
      status: 'PENDING',
    });
    if (!friendshipStatus) {
      return;
    }
    const parent = {
      _id: '2',
      userName: '',
      fullName: '',
      bio: '',
      profileImage: '',
      gender: Gender.Male,
      isPrivate: true,
      email: '',
      friendshipStatus: {
        following: true,
        incomingRequest: true,
        outgoingRequest: true,
        followedBy: true,
      },
    };
    const result = await friendshipStatus(parent, {}, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      following: true,
      incomingRequest: true,
      outgoingRequest: false,
      followedBy: true,
    });
  });
});
