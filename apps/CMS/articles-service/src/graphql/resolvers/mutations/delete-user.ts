import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { input }) => {
  try {
    const { email } = input;
    const user = await UserModel.findOneAndDelete({ email });

    if (!user) {
      return graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND);
    }

    return { message: 'Хэрэглэгч амжилттай устлаа' };
  } catch (error) {
    return graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
