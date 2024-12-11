import QRCode from 'qrcode';
import { QRModel, userModel } from '../../../models';
import { MutationResolvers } from '../../../generated';
import { QRGenerator } from '../../../library/nodemailer';

export const sendQrToEmail: MutationResolvers['sendQrToEmail'] = async (_, { input }) => {
  const { email, link } = input;

  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error('User not found');

  const generated = await QRCode.toDataURL(link);
  const qrRecord = new QRModel({
    email,
    link: link,
    generatedQR: generated,
  });
  await qrRecord.save();

  QRGenerator(email, generated);

  return {
    success: true,
    message: `QR code email sent successfully to ${email}.`,
  };
};
