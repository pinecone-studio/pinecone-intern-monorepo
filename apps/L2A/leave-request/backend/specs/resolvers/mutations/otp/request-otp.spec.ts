import { OTP } from "apps/L2A/leave-request/backend/src/models/models";
import { requestOTP } from "apps/L2A/leave-request/backend/src/resolvers/mutations";
import { sendEmail } from "apps/L2A/leave-request/backend/src/resolvers/mutations/otp/send-email";
import { randomInt } from "crypto";

jest.mock("crypto", () => ({
  randomInt: jest.fn(),
}));

jest.mock("apps/L2A/leave-request/backend/src/resolvers/mutations/otp/send-email", () => ({
  sendEmail: jest.fn(),
}));

jest.mock("apps/L2A/leave-request/backend/src/models/models", () => ({
  OTP: {
    findOneAndUpdate: jest.fn(),
  },
}));

describe("requestOTP", () => {
  const mockEmail = "TestUser@example.com";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate OTP, update DB, send email, and return true", async () => {
    const mockOTP = "123456";
    (randomInt as jest.Mock).mockReturnValueOnce(parseInt(mockOTP));
    (OTP.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({});
    (sendEmail as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await requestOTP(null, { email: mockEmail });

    expect(randomInt).toHaveBeenCalledWith(100000, 999999);
    expect(OTP.findOneAndUpdate).toHaveBeenCalledWith(
      { email: mockEmail.toLowerCase().trim() },
      expect.objectContaining({ otp: mockOTP }),
      { upsert: true, new: true }
    );
    expect(sendEmail).toHaveBeenCalledWith(mockEmail.toLowerCase().trim(), mockOTP);
    expect(result).toBe(true);
  });

  it("should return false and log error if something fails", async () => {
    (randomInt as jest.Mock).mockImplementation(() => {
      throw new Error("Random failed");
    });

    const result = await requestOTP(null, { email: mockEmail });

    expect(result).toBe(false);
  });
});
