import { MutationResolvers } from '@/graphql/generated';
import {UserModel} from '@/models/user.model';
import graphqlErrorHandler, { errorTypes } from '../error';

export const updatedUser: MutationResolvers['updatedUser'] = async (_, { _id,input }) => {
    try {
      const updatedUserId = await UserModel.findByIdAndUpdate(_id,input);
      if (!updatedUserId) {
        throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
      }
  
      return updatedUserId;
    } catch (error) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
    }
  };