import { GraphQLResolveInfo } from 'graphql';
import { getEmployeeByEmail } from '../../../src/resolvers/queries';

jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    findOneAndUpdate: jest
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

describe('getEmployeeByEmail', () => {
  const context = {
    req: {
      user: { email: '' },
    },
  };
  it('should get employees', async () => {
    const res = await getEmployeeByEmail!({}, { email: 'jvk@gmail.com' }, context, {} as GraphQLResolveInfo);

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
  it('should throw an error when no employee found with the provided email address', async () => {
    await expect(getEmployeeByEmail!({}, { email: 'jv@gmail.com' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('No employee found with the provided email address');
  });
});
