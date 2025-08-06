import { QueryResolvers } from 'src/generated';
import { InterestsModel } from 'src/models/interests.model';

export const getInterest: QueryResolvers['getInterest'] = async (_, { _id }) => {
  const interest = await InterestsModel.findById(_id);

  if (!interest) {
    throw new Error('Interest not found');
  }

  return {
    _id: interest._id.toString(),
    id: interest._id.toString(),
    interestName: interest.interestName,
    __typename: 'Interest',
  };
};
