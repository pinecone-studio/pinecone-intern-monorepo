import jwt from 'jsonwebtoken';
import { MutationResolvers } from '@/graphql/generated';
import { cmsUserModel } from '@/models';
import { graphqlErrorHandler, errorTypes } from '../error';
import { GraphQLError } from 'graphql';

export const cmsLogin: MutationResolvers['cmsLogin'] = async (_, { input }) => {
  try {
    const { email, password } = input;
    const user = await cmsUserModel.findOne({ email, password });
    if (!user) {
      throw graphqlErrorHandler({ message: 'Имэйл эсвэл нууц үг буруу байна' }, errorTypes.NOT_FOUND);
    }

    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userEmail = user.email;
    const roles = user.roles;

    const token = jwt.sign({ id, firstName, lastName, userEmail, roles }, 'secret-key');

    return { token, message: 'Амжилттай нэвтэрлээ' };
  } catch (error) {
    if (error instanceof GraphQLError) throw error;
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
