import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/models';
import { GraphQLError } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '../error';

export const signUp: MutationResolvers['signUp'] = async (_, { input }) => {
  try {
    const { email, phoneNumber, password } = input;
    const orFilter = [{ email }, { phoneNumber }];

    const userExists = await UserModel.findOne({
      $or: orFilter.filter((item) => {
        return Object.values(item)[0];
      }),
    });

    if (userExists) {
      throw graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч байна' }, errorTypes.ALREADY_EXISTS);
    }

    await UserModel.create({ email, phoneNumber, password });

    return { message: 'Хэрэглэгч амжилттай үүслээ' };
  } catch (error) {
    if (error instanceof GraphQLError) throw error;

    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
