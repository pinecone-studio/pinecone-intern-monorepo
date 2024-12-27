import { GraphQLResolveInfo } from 'graphql';
import { getEmployees } from '../../../src/resolvers/queries';
import { EmployeeModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '676e6dd407d5ae05a35cda84',
        email: 'jvk@gmail.com',
        jobTitle: 'senior',
        username: 'jvk',
        adminStatus: false,
        employeeStatus: 'Lead',
        updatedAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
        createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('getEmployeeById', () => {
  const context = {
    req: {
      user: { id: '1' },
    },
  };

  it('should get employees', async () => {
    const res = await getEmployees!({}, { input: 'Lead' }, context, {} as GraphQLResolveInfo);

    expect(EmployeeModel.find);
    expect(res).toEqual({
      _id: '676e6dd407d5ae05a35cda84',
      email: 'jvk@gmail.com',
      jobTitle: 'senior',
      username: 'jvk',
      adminStatus: false,
      employeeStatus: 'Lead',
      updatedAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
      createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
    });
  });

  it('should throw an error when no employee is found', async () => {
    await expect(getEmployees!({}, { input: 'Lead' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('There is no employees');

    expect(EmployeeModel.find);
  });
});
