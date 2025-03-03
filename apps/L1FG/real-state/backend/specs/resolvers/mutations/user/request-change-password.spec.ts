import { requestChangePassword } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValue({ email: '' }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({ email: '' }),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue({}),
}));

describe('Change password', () => {
  it('it should be error', async () => {
    await expect(requestChangePassword!({}, { input: { email: 'aa' } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toEqual(new Error('Бүртгэлтэй хаяг олдсонгүй шалгаад дахин оруулна уу !'));
  });

  it('2.should change', async () => {
    await expect(requestChangePassword!({}, { input: { email: '' } }, { userId: null }, {} as GraphQLResolveInfo)).resolves.toEqual({ email: '' });
  });
});
