import { InterestsModel } from 'src/models/interests.model';
import { QueryResolvers } from 'src/generated';

export const getAllInterests: QueryResolvers['getAllInterests'] = async () => {
  const interests = await InterestsModel.find({});

  return interests.map((interest) => ({
    _id: interest._id.toString(),
    id: interest._id.toString(),
    interestName: interest.interestName,
    __typename: 'Interest',
  }));
};
