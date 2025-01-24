// import { QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const getUserByName = async (_: unknown, { userName }: any, { userId }: any) => {
  // if (!userId) throw new Error('Unauthorized');
  console.log(userId);

  // if (!userName) {
  //   throw new Error('userName is required');
  // }

  try {
    return await UserModel.find({
      userName: { $regex: userName, $options: 'i' },
    });
  } catch (error) {
    // console.error('Error in searchUsersByName:', error);
    // throw new Error('Failed to fetch users');
  }
};
