import { sendEmail } from "apps/L2A/leave-request/backend/src/resolvers/mutations/otp/send-email";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

const sendMailMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (nodemailer.createTransport as jest.Mock).mockReturnValue({
    sendMail: sendMailMock,
  });
});

describe("sendEmail", () => {
  const to = "user@example.com";
  const otp = "123456";

  it("should send email with correct parameters", async () => {
    sendMailMock.mockResolvedValueOnce({ messageId: "mocked-id" });
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    await sendEmail(to, otp);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: `"Leave Request" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    expect(consoleLogSpy).toHaveBeenCalledWith("Email sent:", "mocked-id");

    consoleLogSpy.mockRestore();
  });

  it("should throw an error and log it if email sending fails", async () => {
    const error = new Error("SMTP error");
    sendMailMock.mockRejectedValueOnce(error);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    await expect(sendEmail(to, otp)).rejects.toThrow("SMTP error");

    expect(consoleErrorSpy).toHaveBeenCalledWith("Email sending failed:", error);

    consoleErrorSpy.mockRestore();
  });
});
