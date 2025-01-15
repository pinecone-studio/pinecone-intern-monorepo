import { requestChangePassword } from 'apps/L1FG/real-state/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    updateOne: jest.fn().mockResolvedValueOnce({}),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue({}),
}));

describe('Change password', () => {
  it('should change', async () => {
    const response = await requestChangePassword!({}, { input: { email: '' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual({
      email: '',
    });
  });
});
