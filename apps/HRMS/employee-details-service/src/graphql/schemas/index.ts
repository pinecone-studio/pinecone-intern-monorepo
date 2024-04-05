import { mergeTypeDefs } from '@graphql-tools/merge';
import { employeeTypeDefs } from './employee.schema';
import { personalInformationTypeDefs } from './personal-information.schema';
import { familyTypeDefs } from './family.schema';

export const typeDefs = mergeTypeDefs([employeeTypeDefs, personalInformationTypeDefs, familyTypeDefs]);
