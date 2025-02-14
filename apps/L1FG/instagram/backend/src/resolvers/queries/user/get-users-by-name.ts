import { GraphQLError } from 'graphql';
import { UserModel, FollowerModel } from '../../../models';
import { UnauthenticatedError } from '../../../utils/error';

// eslint-disable-next-line complexity
export const getUserByName = async (_: unknown, { userName }: { userName: string }, { userId }: { userId: string | null }, __: unknown) => {
  try {
    if (!userId) {
      throw new UnauthenticatedError('Нэвтэрнэ үү');
    }

    const myFollowings = await FollowerModel.distinct('followerId', { targetId: userId });

    const users = await UserModel.aggregate([
      {
        $match: {
          userName: { $regex: userName, $options: 'i' },
        },
      },
      {
        $lookup: {
          from: 'follows',
          localField: '_id',
          foreignField: 'targetId',
          as: 'followers',
        },
      },
      {
        $addFields: {
          mutualFollowers: {
            $filter: {
              input: '$followers',
              as: 'follower',
              cond: { $in: ['$$follower.followerId', myFollowings] },
            },
          },
        },
      },
      {
        $addFields: {
          mutualFollowersCount: { $size: '$mutualFollowers' },
          mutualFollowers: {
            $map: {
              input: '$mutualFollowers',
              as: 'mf',
              in: '$$mf.followerId',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'mutualFollowers',
          foreignField: '_id',
          as: 'mutualFollowerDetails',
        },
      },
      {
        $addFields: {
          mutualFollowers: {
            $arrayElemAt: [
              {
                $map: {
                  input: '$mutualFollowerDetails',
                  as: 'mf',
                  in: '$$mf.userName',
                },
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          userName: 1,
          profileImage: 1,
          seenStoryTime: 1,
          latestStoryTimestamp: 1,
          followerCount: 1,
          mutualFollowersCount: 1,
          mutualFollowers: 1,
        },
      },
      { $limit: 5 },
    ]);

    return users;
  } catch (error) {
    throw new GraphQLError(error instanceof Error ? error.message : 'server error', {
      extensions: {
        code: error instanceof UnauthenticatedError ? error.name : 'Database error',
      },
    });
  }
};
