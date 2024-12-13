import { userModel } from 'apps/L1AB/concert-ticket-booking/backend/src/models';
import { QRGenerator } from '../../../../src/library/nodemailer';
import { sendQrToEmail } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        userId: 'someUserId',
        email: 'test@example.com',
      })
      .mockRejectedValueOnce(null),
  },
  QRModel: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  QRGenerator: jest.fn().mockResolvedValue({}),
}));

describe('Send QR Code to Email', () => {
  it('should send email', async () => {
    const mockContext = { user: { userId: 'someUserId', email: 'test@example.com' } };

    jest.spyOn(userModel, 'findById').mockResolvedValueOnce({ email: 'test@example.com' });

    const response = await sendQrToEmail!({}, {}, mockContext, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      success: true,
      message: `QR code email sent successfully to test@example.com.`,
    });

    expect(QRGenerator).toHaveBeenCalledWith('test@example.com', expect.any(String));
  });
  it('should throw an error when userId is not provided', async () => {
    try {
      await sendQrToEmail!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Unauthorized: No user found in context.'));
    }
  });
});
