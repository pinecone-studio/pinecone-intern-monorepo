import { FollowerModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { createFollower } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
const input = {
  followerId: '',
  targetId: '',
};
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Follow', () => {
  it('Should follow',async()=>{
    if(!createFollower)
      {
        return
      }
      (FollowerModel.create as jest.Mock).mockResolvedValue({
        _id:'13',
      });
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id:'ad',
        followingCount:2
      });
      const result=await createFollower({}, { input }, { userId: "asd" }, {} as GraphQLResolveInfo)
      expect(result).toEqual({
        _id:'13'
      })
  })
  it('Should throw an database error when FollowerModel throws an error', async () => {
    if(!createFollower)
    {
      return
    }
    const mockCreate=jest.fn(()=>{
      throw new GraphQLError('Database error')
    });
    FollowerModel.create=mockCreate;
    await expect(createFollower({}, { input }, { userId: "asd" }, {} as GraphQLResolveInfo)).rejects.toThrow('Database error')
  });
  it('Should throw an database error when UserModel throws an error',async()=>{
    if(!createFollower)
    {
      return
    }
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id:'ad',
      followingCount:2
    })
    const mockFindByIdAndUpdate=jest.fn(()=>{
      throw new GraphQLError('Database error')
    })
    UserModel.findByIdAndUpdate=mockFindByIdAndUpdate
    await expect(createFollower({}, { input }, { userId: "asd" }, {} as GraphQLResolveInfo)).rejects.toThrow('Database error')
  })
  it('Should throw an unauthorized error', async () => {
    if (!createFollower) {
      return;
    }
    const input = {
      followerId: '',
      targetId: '',
    };
    await expect(createFollower({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
