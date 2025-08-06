import { InterestsModel } from 'src/models/interests.model';
import { QueryResolvers } from 'src/generated';

export const getAllInterests: QueryResolvers['getAllInterests'] = async () => {
  const allInterests = await InterestsModel.find({});

  return allInterests;
};
