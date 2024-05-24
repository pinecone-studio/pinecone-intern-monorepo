import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/model';
import { GraphQLError } from 'graphql';

export const lessonSignUp: MutationResolvers['lessonSignUp'] = async (_, { input }) => {
  try {
    const { email, phoneNumber, password } = input;

    const orFilter = [{ email }, { phoneNumber }];

    const userExists = await UserModel.findOne({
      $or: orFilter.filter((item) => {
        return Object.values(item)[0];
      }),
    });

    if (userExists) {
      throw new GraphQLError('Бүртгэлтэй хэрэглэгч байна');
    }

    await UserModel.create({ email, phoneNumber, password });

    return { message: 'Хэрэглэгч амжилттай үүслээ' };
  } catch (error) {
    throw new GraphQLError('Алдаа гарлаа');
  }
};
