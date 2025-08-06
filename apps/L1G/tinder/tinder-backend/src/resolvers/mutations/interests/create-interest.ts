import { MutationResolvers } from 'src/generated';
import { InterestsModel } from 'src/models/interests.model';

export const createInterest: MutationResolvers['createInterest'] = async (_, { interestName }) => {
  const createdInterest = await InterestsModel.create({ interestName });

  return {
    _id: createdInterest._id.toString(),
    id: createdInterest._id.toString(),
    interestName: createdInterest.interestName,
    __typename: 'Interest',
  };
};
