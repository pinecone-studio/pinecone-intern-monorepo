import QRCode from 'qrcode';
import { bookingModel, EventModel, QRModel, userModel } from '../../../models';
import { MutationResolvers } from '../../../generated';
import { QRGenerator } from '../../../library/nodemailer';
import { Context } from '../../../handler';

export const sendQrToEmail: MutationResolvers['sendQrToEmail'] = async (_, __, { user }: Context) => {
  if (!user?.userId) {
    throw new Error('Unauthorized: No user found in context.');
  }
  const signedUser = await userModel.findById({ _id: user.userId });
  const bookingDetails = await bookingModel.find({ userId: user.userId }).sort({ createdAt: -1 }).limit(1);
  const bookingDetail = bookingDetails[0];
  const eventId = bookingDetail.eventId;
  const eventDetails = await EventModel.findOne({ _id: eventId });

  const defaultLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const generated = await QRCode.toDataURL(defaultLink);

  await QRModel.create({
    email: signedUser.email,
    link: defaultLink,
    generatedQR: generated,
  });

  await QRGenerator(signedUser.email, generated, bookingDetail, eventDetails);

  return {
    success: true,
    message: `QR code email sent successfully to ${signedUser.email}.`,
  };
};
