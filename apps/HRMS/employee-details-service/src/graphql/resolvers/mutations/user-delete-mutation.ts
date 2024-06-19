import { MutationResolvers } from '@/graphql/generated';
import {UserModel} from '@/models/user.model';
import graphqlErrorHandler, { errorTypes } from '../error';

export const deletedUser: MutationResolvers['deletedUser'] = async (_, { _id }) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(_id);
      if (!deletedUser) {
        throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
      }
  
      return deletedUser;
    } catch (error) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
    }
  };