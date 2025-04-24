import { OTP } from "apps/L2A/leave-request/backend/src/models/models";
import { verifyOTP } from "apps/L2A/leave-request/backend/src/resolvers/mutations";


jest.mock("apps/L2A/leave-request/backend/src/models/models", () => ({
  OTP: {
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

describe("verifyOTP", () => {
  const email = "TestUser@example.com";
  const normalizedEmail = email.toLowerCase().trim();
  const otp = "123456";

  const baseRecord = {
    email: normalizedEmail,
    otp: "123456",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return false if no OTP record found", async () => {
    (OTP.findOne as jest.Mock).mockResolvedValue(null);

    const result = await verifyOTP(null, { email, otp });

    expect(OTP.findOne).toHaveBeenCalledWith({ email: normalizedEmail });
    expect(result).toBe(false);
  });

  it("should return false if OTP does not match", async () => {
    (OTP.findOne as jest.Mock).mockResolvedValue({ ...baseRecord, otp: "654321" });

    const result = await verifyOTP(null, { email, otp });

    expect(result).toBe(false);
  });

  it("should return false if OTP is expired", async () => {
    (OTP.findOne as jest.Mock).mockResolvedValue({
      ...baseRecord,
      expiresAt: new Date(Date.now() - 1000), 
    });

    const result = await verifyOTP(null, { email, otp });

    expect(result).toBe(false);
  });

  it("should return true and delete the OTP if valid", async () => {
    (OTP.findOne as jest.Mock).mockResolvedValue(baseRecord);
    (OTP.deleteOne as jest.Mock).mockResolvedValue({});

    const result = await verifyOTP(null, { email, otp });

    expect(result).toBe(true);
    expect(OTP.deleteOne).toHaveBeenCalledWith({ email: normalizedEmail });
  });
});
