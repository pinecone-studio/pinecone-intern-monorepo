import { GraphQLError } from 'graphql';
import { MutationResolvers } from '../../../generated';
import { FollowerModel, UserModel } from '../../../models';

export const createFollower: MutationResolvers['createFollower'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { followerId, targetId } = input;
 try {
 const follow= await FollowerModel.create({
    followerId,
    targetId,
  });
   await UserModel.findByIdAndUpdate(targetId,{ $inc:{followerCount:1}},{new:true});
   await  UserModel.findByIdAndUpdate(followerId,{$inc:{followingCount:1}},{new:true});
   return follow
 }  catch (error) {
  throw new GraphQLError('Database error',{
    extensions: {
      code: 'DATABASE_ERROR',
    },
  })
 }
};
