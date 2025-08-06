import { MutationResolvers } from 'src/generated';
import { InterestsModel } from 'src/models/interests.model';

export const createInterest: MutationResolvers['createInterest'] = async (_, { interestName }) => {
  const createdInterest = await InterestsModel.create({ interestName });

  return createdInterest;
};
