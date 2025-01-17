import { MutationResolvers } from '../../../generated';
import { RequestModel } from '../../../models';

export const creteRequest: MutationResolvers['creteRequest'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { from, to, status } = input;
  const request = await RequestModel.create({
    from,
    to,
    status,
  });
  return request;
};
