import { GraphQLResolveInfo } from 'graphql';
import { friendshipStatus } from '../../../src/resolvers/following-user-type';
import { RequestModel } from '../../../src/models/request.model';
import { FollowerModel } from '../../../src/models/followers.modul';
jest.mock('../../../src/models/followers.modul');
jest.mock('../../../src/models/request.model');
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
      bio: '',
      email: '',
      fullName: '',
      userName: '',
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
      bio: '',
      email: '',
      fullName: '',
      userName: '',
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
      bio: '',
      email: '',
      fullName: '',
      userName: '',
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
