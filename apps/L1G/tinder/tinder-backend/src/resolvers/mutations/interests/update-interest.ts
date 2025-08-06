import { MutationResolvers } from 'src/generated';
import { InterestsModel } from 'src/models/interests.model';

export const updateInterest: MutationResolvers['updateInterest'] = async (_, { _id, interestName }) => {
  const updatedInterest = await InterestsModel.findByIdAndUpdate(_id, { interestName }, { new: true });

  if (!updatedInterest) {
    throw new Error('Interest not found');
  }

  return {
    _id: updatedInterest._id.toString(),
    id: updatedInterest._id.toString(),
    interestName: updatedInterest.interestName,
    __typename: 'Interest',
  };
};
