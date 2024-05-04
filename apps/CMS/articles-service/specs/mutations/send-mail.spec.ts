import { sendMail } from '@/graphql/resolvers/mutations';
import { UserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';
import nodemailer from 'nodemailer';

const input = {
  email: test,
};

jest.mock('nodemailer');

jest.mock('../../src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
    updateOne: jest.fn(),
  },
}));

describe('sendMail resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send mail with OTP and update user', async () => {
    UserModel.findOne as jest.Mock;
  });
});
