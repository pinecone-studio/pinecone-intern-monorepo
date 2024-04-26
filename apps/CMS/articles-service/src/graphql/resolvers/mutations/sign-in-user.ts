import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export const signIn: MutationResolvers['signIn'] = async (_, { input }) => {
  try {
    const { emailOrPhoneNumber, password } = input;

    const user = await UserModel.findOne({
      $or: [
        { email: emailOrPhoneNumber, password },
        { phoneNumber: emailOrPhoneNumber, password },
      ],
    });

    if (!user) {
      throw graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND);
    }

    const id = user._id;
    const token = jwt.sign({ id }, 'secret-key');

    return { token, message: 'Амжилттай нэвтэрлээ' };
  } catch (error) {
    if (error instanceof GraphQLError) throw error;

    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
