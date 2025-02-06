import { GraphQLError } from 'graphql';
import { UserModel } from '../../../models';
import { UnauthenticatedError } from '../../../utils/error';
import { UserTogetherUserType } from '../../../generated';

export const getUserByName = async (_: unknown, { userName }: { userName: string }, { userId }: { userId: string | null }, __: unknown) => {
  try {
    if (!userId) {
      throw new UnauthenticatedError('Нэвтэрнэ үү');
    }
    const users: UserTogetherUserType[] = await UserModel.find({
      userName: { $regex: userName, $options: 'i' },
    });
    return users;
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      throw new GraphQLError(`${error.message}`, {
        extensions: {
          code: `${error.name}`,
        },
      });
    }
  }
};
