import { ChallengeSessionModel } from '@/graphql/model/index';
import { QueryResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const getChallengeSessionsByOwn: QueryResolvers['getChallengeSessionByOwn'] = async (_, { studentEmail }) => {
  try {
    const challengeSessions = await ChallengeSessionModel.find({}, {}, {studentEmail: studentEmail}).populate('challenges');
    return challengeSessions;
  } catch (error) {
    throw new GraphQLError('Error in get challenge sessions query');
  }
};
