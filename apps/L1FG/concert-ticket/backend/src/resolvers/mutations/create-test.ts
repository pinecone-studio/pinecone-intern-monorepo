import { MutationResolvers } from '../../generated';
import { testModel } from '../../models/test.model';

export const createTest: MutationResolvers['createTest'] = async (_: unknown, { name, email, phoneNumber }) => {
  await testModel.create({
    name,
    email,
    phoneNumber,
  });
  return { name, email, phoneNumber };
};
