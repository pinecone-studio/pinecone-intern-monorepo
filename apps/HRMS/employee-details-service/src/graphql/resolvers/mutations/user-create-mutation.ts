import { MutationResolvers } from '@/graphql/generated';
import {UserModel} from '@/models/user.model';
import graphqlErrorHandler, { errorTypes } from '../error';

export const createUser: MutationResolvers['createUser'] = async (_, { input }) => {
    try {
      const create = await UserModel.create(input);
      return create;
    } catch (error) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
    }
  };
  