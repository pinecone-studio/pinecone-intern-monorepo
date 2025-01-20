import { GraphQLResolveInfo } from 'graphql';
import { getEmployeeByOtp } from '../../../src/resolvers/queries';

jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '6780c72a35cb33f7de8677c6',
        email: 'tsaganaa1@gmail.com',
        jobTitle: 'software developer',
        username: 'tsagaanaa1',
        adminStatus: 'false',
        employeeStatus: 'Employee',
        otpToken: '6797',
        otpUpdatedAt: 'Fri Jan 10 2025 16:09:34 GMT+0800 (Ulaanbaatar Standard Time)',
        createdAt: 'Fri Dec 27 2024 17:06:03 GMT+0800 (Ulaanbaatar Standard Time)',
        updatedAt: 'Fri Jan 10 2025 16:09:34 GMT+0800 (Ulaanbaatar Standard Time)',
      })
      .mockResolvedValueOnce({
        otpToken: '1111',
      }),
  },
}));
describe('getEmployeeByOtp', () => {
  const context = {
    req: {
      user: { email: '', otpToken: '' },
    },
  };
  it('should get employees', async () => {
    await getEmployeeByOtp!({}, { email: 'tsaganaa1@gmail.com', otpToken: '6797' }, context, {} as GraphQLResolveInfo);
  });
  it('should throw an error when no employee found with the provided email and otpToken', async () => {
    await expect(getEmployeeByOtp!({}, { email: 'tsaganaa1@gmail.com', otpToken: '6797' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP token');
  });
});
