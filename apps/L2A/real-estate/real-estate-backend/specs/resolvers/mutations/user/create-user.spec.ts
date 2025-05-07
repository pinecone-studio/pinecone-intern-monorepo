import { createUser } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations";
import { USER_MODEL } from "apps/L2A/real-estate/real-estate-backend/src/models/user";

jest.mock("apps/L2A/real-estate/real-estate-backend/src/models/user");

describe("createUser", () => {
  const mockEmail = "test@example.com";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user if one does not already exist", async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValue(null);
    (USER_MODEL.create as jest.Mock).mockResolvedValue({
      _id: "507f1f77bcf86cd799439011",
      email: mockEmail,
      isAdmin: false,
    });

    const result = await createUser({}, { email: mockEmail });

    expect(USER_MODEL.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(USER_MODEL.create).toHaveBeenCalledWith({ email: mockEmail });
    expect(result).toEqual({
      id: "507f1f77bcf86cd799439011",
      email: mockEmail,
      isAdmin: false,
    });
  });

  it("should throw an error if user already exists", async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValue({ email: mockEmail });

    await expect(createUser({}, { email: mockEmail })).rejects.toThrow(
      "user already exist"
    );

    expect(USER_MODEL.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(USER_MODEL.create).not.toHaveBeenCalled();
  });
});
