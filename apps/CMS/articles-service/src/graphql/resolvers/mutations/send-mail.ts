import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/models';
import { errorTypes, graphqlErrorHandler } from '../error';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';

export const sendMail: MutationResolvers['sendMail'] = async (_, { input }) => {
  try {
    const { email } = input;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND);
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + 300;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'uulaaka73@gmail.com',
        pass: 'utrhxcutldbgdjuk',
      },
    });
    const mailOptions = {
      from: 'uulaaka73@gmail.com',
      to: email,
      subject: 'Pinecone',
      text: `Нэг удаагын code: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    await UserModel.updateOne(
      {
        _id: user.id,
      },
      { $set: { otp: otp, otpExpiresIn: expirationTime } }
    );

    return { message: 'Амжилттай илгээгдлээ' };
  } catch (error) {
    return graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
