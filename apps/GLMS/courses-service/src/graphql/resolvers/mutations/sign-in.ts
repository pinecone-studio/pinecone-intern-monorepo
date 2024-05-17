import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/model';
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
      throw new GraphQLError('Бүртгэлтэй хэрэглэгч алга')
    }

    const id = user._id;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    const token = jwt.sign({ id, name, email, role }, 'secret-key');

    return { token, message: 'Амжилттай нэвтэрлээ' };
  } catch (error) {
    if (error instanceof GraphQLError) throw error;

    throw new GraphQLError('Алдаа гарлаа')
  }
};
