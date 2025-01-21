import { GraphQLResolveInfo } from 'graphql';
import { friendshipStatus } from '../../../src/resolvers/FollowerUserType';

jest.mock('../../../src/models', () => ({
  FollowerModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        followerId: 'fid',
        targetId: 'tar1',
      })
      .mockResolvedValueOnce(null),
  },
  RequestModel: {
    findOne: jest
      .fn()
      .mockResolvedValue(null)
      .mockResolvedValueOnce({
        _id: '2',
        from: '34',
        to: 'if',
        status: 'PENDING',
      })
      .mockResolvedValueOnce({
        _id: '2',
        from: '34',
        to: 'if',
        status: 'PENDING',
      }),
  },
}));
describe('FreindshipStatus', () => {
  it('Should give friend statuses true', async () => {
    if(!friendshipStatus)
      {
        return
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
    });
  });
  it('Should give friend statuses false', async () => {
    if(!friendshipStatus)
    {
      return
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
    });
  });
  it('Should give manual promise if userId equal to _id',async()=>{
    if(!friendshipStatus)
      {
        return
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
        following: false,
        incomingRequest: false,
        outgoingRequest: false,
      });
  })


});
