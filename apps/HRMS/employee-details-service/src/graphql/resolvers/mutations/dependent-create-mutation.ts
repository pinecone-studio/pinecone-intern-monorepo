import { Dependent, DependentModel } from '../../../models/dependent';
import { MutationResolvers } from '../../generated';

export const createDependent = async (_: any, { firstname, lastname, phone, dependency }: Dependent) => {
  try {
    const create = await DependentModel.create({ firstname: firstname, lastname: lastname, phone: phone, dependency: dependency });
    console.log(create);
    return create;
  } catch (error) {
    throw new Error('failed create dependent');
  }
};
