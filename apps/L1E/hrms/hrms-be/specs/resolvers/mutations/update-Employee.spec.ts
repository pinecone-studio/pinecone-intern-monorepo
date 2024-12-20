import { updateEmployee } from '../../../src/resolvers/mutations';
import { EmployeeStatus } from '../../../src/models/employee.model';
import { GraphQLResolveInfo } from 'graphql';
import { EmployeeInput } from '../../../src/generated';
jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      id: '1',
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: 'Lead',
    }),
  },
}));

describe('updateEmployee Resolver', () => {
  it('should update a Employee ', async () => {
    const mockinput: EmployeeInput = {
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: EmployeeStatus.Lead,
    };
    const context = {
      req: {
        user: { id: '1' },
      },
    };
    const result = await updateEmployee!({}, { input: mockinput, id: '1' }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: 'Lead',
    });
  });
});
