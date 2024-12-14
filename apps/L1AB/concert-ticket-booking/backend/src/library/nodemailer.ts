import { createTransport } from 'nodemailer';
import { BookingType, EventType } from '../models';

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendEmail = async (to: string, otp: string) => {
  const options = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject: 'Reset Password OTP: L1AB Team 2 Intern',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f9;">
        <h2 style="color: #00B7F4; text-align: start; font-size: 24px;">Танд нууц үг сэргээх OTP<span style="color: #C0C0C0">/нэг удаагийн код/</span> илгээлээ</h2>

        <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <p style="font-size: 16px; margin-bottom: 20px;">Таны нууц үг сэргээх OTP:</p>

          <h3 style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background-color: #00B7F4;
            border-radius: 5px;
            text-align: center;
            margin: 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          ">
            ${otp}
          </h3>

          <p style="font-size: 16px; margin-top: 20px;">Энэхүү OTP нь <strong>5 минутын</strong> хугацаанд хүчинтэй байна. 
          <br>Хүчинтэй хугацаа дуусахаас өмнө дахин OTP хүсэлт илгээвэл, 
          <br>энэхүү OTP - г ашиглах боломжгүй болохыг анхаарна уу.</p>
        </div>

        <hr style="border: 0; border-top: 2px solid #00B7F4; margin-top: 40px; margin-bottom: 20px;"/>

        <p style="font-size: 12px; color: #666; text-align: start;">This email was sent by L1AB Team 2 Intern.</p>
      </div>
    `,
  };

  await transporter.sendMail(options);
};

export const QRGenerator = async (to: string, qrCodeDataURL: string, bookingData: BookingType, eventData: EventType) => {
  const { amountTotal, selectedDate, venues, phone, status, createdAt, email } = bookingData;
  const { name, location, eventDate, eventTime, artistName, images } = eventData;

  const venueDetails = venues
    .map(
      (venue) => `
      <li style="margin-bottom: 10px;">
        <strong>${venue.name}:</strong> Quantity: ${venue.quantity}, Price: ${venue.price}₮
      </li>`
    )
    .join('');

  const options = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject: 'Booking details & QR Code: L1AB Team 2 Intern',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f9;">
        <h2 style="color: #00B7F4; text-align: start; font-size: 24px;">Танд захиалгын дэлгэрэнгүйг QR кодын хамт илгээлээ</h2>
        
        <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <h3 style="color: #00B7F4; font-size: 20px;">Тоглолтын мэдээлэл:</h3>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Тоглолтын нэр:</strong> ${name}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Уран бүтээлч:</strong> ${artistName.join(', ')}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Хаана:</strong> ${location}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Хэзээ:</strong> ${eventDate[0]} ${eventTime[0]}</p>

          <div style="margin-bottom: 20px;">
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
              <img src="${images[0]}" alt="Event Image" style="width: 100%; max-width: 400px; height: auto; border-radius: 8px;" />
            </div>
          </div>
        </div>

        <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); margin-top: 20px;">
          <h3 style="color: #00B7F4; font-size: 20px;">Захиалагчийн мэдээлэл:</h3>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Захиалсан тоглолтын өдөр:</strong> ${selectedDate}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Захиалгын статус:</strong> ${status}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>И-мэйл хаяг:</strong> ${email}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Утасны дугаар:</strong> ${phone}</p>
        </div>

        <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); margin-top: 20px;">
          <h3 style="color: #00B7F4; font-size: 20px;">Тасалбарын мэдээлэл:</h3>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Тасалбар захиалсан огноо:</strong> ${new Date(createdAt).toLocaleString()}</p>
          <ul style="font-size: 16px; list-style: square; margin-left: 20px;">
            ${venueDetails}
          </ul>
          <p style="font-size: 16px; margin-top: 10px;"><strong>Нийт дүн:</strong> ${amountTotal}₮</p>
        </div>

        <div style="text-align: start; margin-top: 20px;">
          <div style="display: inline-block; padding: 10px; background-color: white; border: 2px solid #00B7F4; border-radius: 8px;">
            <img src="cid:qr-code" alt="QR Code" style="width: 250px; height: 250px; display: block; border-radius: 8px;" />
          </div>
          <p style="font-size: 16px; color: #333; margin-top: 10px;"><strong>Жич: </strong>Энэхүү QR кодыг тасалбар шалгагчид уншуулан баталгаажуулах боломжтой!</p>
        </div>

        <hr style="border: 0; border-top: 2px solid #00B7F4; margin-top: 40px; margin-bottom: 20px;"/>

        <p style="font-size: 12px; color: #666; text-align: center;">This email was sent by L1AB Team 2 Intern.</p>
      </div>`,

    attachments: [
      {
        filename: 'qrcode.png',
        content: qrCodeDataURL.split(',')[1],
        encoding: 'base64',
        cid: 'qr-code',
      },
    ],
  };

  await transporter.sendMail(options);
};
