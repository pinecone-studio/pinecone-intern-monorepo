import { MutationResolvers } from 'src/generated';
import { InterestsModel } from 'src/models/interests.model';

export const deleteInterest: MutationResolvers['deleteInterest'] = async (_, { _id }) => {
  const deletedInterest = await InterestsModel.findByIdAndDelete(_id);

  if (!deletedInterest) {
    throw new Error('Interest not found');
  }
  return deletedInterest;
};
