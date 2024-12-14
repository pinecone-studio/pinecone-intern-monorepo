import QRCode from 'qrcode';
import { bookingModel, EventModel, QRModel, userModel } from '../../../../src/models';
import { sendQrToEmail } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('qrcode');
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      response: '250 OK',
    }),
  }),
}));
jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest.fn(),
  },
  bookingModel: {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    }),
  },
  EventModel: {
    findOne: jest.fn(),
  },
  QRModel: {
    create: jest.fn(),
  },
}));

describe('sendQrToEmail', () => {
  const mockUser = { userId: '123' };
  const mockSignedUser = { email: 'test@example.com' };
  const mockBookingDetails = [{ userId: '123', eventId: '456' }];
  const mockEventDetails = { _id: '456', date: new Date() };
  const mockGeneratedQR = 'data:image/png;base64,iVBORw0KGgoAAAANS...';

  beforeEach(() => {
    jest.clearAllMocks();
    (userModel.findById as jest.Mock).mockResolvedValue(mockSignedUser);

    const mockFind = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockBookingDetails),
    };

    (bookingModel.find as jest.Mock).mockImplementation(() => mockFind);
    (EventModel.findOne as jest.Mock).mockResolvedValue(mockEventDetails);
    (QRCode.toDataURL as jest.Mock).mockResolvedValue(mockGeneratedQR);
    (QRModel.create as jest.Mock).mockResolvedValue({});
  });

  it('should send QR code to email successfully', async () => {
    const context = { user: mockUser };
    const result = await sendQrToEmail!({}, {}, context, {} as GraphQLResolveInfo);

    expect(userModel.findById).toHaveBeenCalledWith({ _id: '123' });
    expect(bookingModel.find).toHaveBeenCalledWith({ userId: '123' });
    expect(EventModel.findOne).toHaveBeenCalledWith({ _id: '456' });
    expect(QRCode.toDataURL).toHaveBeenCalledWith('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(QRModel.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      generatedQR: mockGeneratedQR,
    });
    expect(result).toEqual({
      success: true,
      message: `QR code email sent successfully to test@example.com.`,
    });
  });

  it('should throw error if no bookings are found for the user', async () => {
    (bookingModel.find as jest.Mock).mockResolvedValue([]);

    const context = { user: mockUser };

    await expect(sendQrToEmail!({}, {}, context, {} as GraphQLResolveInfo)).rejects.toThrow('No bookings found for the user.');
  });

  it('should throw error if no user is found in context', async () => {
    const context = { user: null };

    await expect(sendQrToEmail!({}, {}, context, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized: No user found in context.');
  });
});
