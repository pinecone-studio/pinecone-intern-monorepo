import { register } from "src/resolvers/mutations/user/register";
import { User } from "src/models";
import { checkEmailExists } from "src/utils/email-exist";
import { hashPassword } from "src/utils/hash";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "src/utils/check-jwt";

jest.mock("src/models", () => ({
  User: {
    create: jest.fn(),
  },
}));

jest.mock("src/utils/email-exist", () => ({
  checkEmailExists: jest.fn(),
}));

jest.mock("src/utils/hash", () => ({
  hashPassword: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("src/utils/check-jwt", () => ({
  getJwtSecret: jest.fn(),
}));

describe("register resolver", () => {
  const mockInput = {
    email: "test@example.com",
    password: "password123",
    userName: "testuser",
    fullName: "Test User",
  };

  const mockContext = {}; // GraphQL context (not used here)

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "testsecret";
  });

  it("should register a user successfully", async () => {
    (getJwtSecret as jest.Mock).mockReturnValue('testsecret');
    (checkEmailExists as jest.Mock).mockResolvedValue(undefined);
    (hashPassword as jest.Mock).mockResolvedValue("hashed123");
    (User.create as jest.Mock).mockResolvedValue({ _id: "123", ...mockInput });
    (jwt.sign as jest.Mock).mockReturnValue("token123");

    const result = await register!(null as any, { input: mockInput }, mockContext as any, {} as any);

    expect(checkEmailExists).toHaveBeenCalledWith("test@example.com", "Sorry try another email!");
    expect(hashPassword).toHaveBeenCalledWith("password123");
    expect(User.create).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "hashed123",
      userName: "testuser",
      fullName: "Test User",
    });
    expect(jwt.sign).toHaveBeenCalledWith({ userId: "123" }, "testsecret");

    expect(result).toEqual({
      success: true,
      message: "Registration successful",
      user: {
        _id: "123",
        email: "test@example.com",
        password: "password123",
        userName: "testuser",
        fullName: "Test User",
      },
      token: "token123",
    });
  });

  it("should throw error if email is missing", async () => {
    await expect(
      register!(null as any, { input: { ...mockInput, email: "" } }, mockContext as any, {} as any)
    ).rejects.toThrow("Email is required");
  });

  it("should throw error if password is missing", async () => {
    await expect(
      register!(null as any, { input: { ...mockInput, password: "" } }, mockContext as any, {} as any)
    ).rejects.toThrow("Password is required");
  });

  it("should throw error if password is missing", async () => {
    await expect(
      register!(null as any, { input: { ...mockInput, userName: "" } }, mockContext as any, {} as any)
    ).rejects.toThrow("Username is required");
  });

  it("should throw error if password is missing", async () => {
    await expect(
      register!(null as any, { input: { ...mockInput, fullName: "" } }, mockContext as any, {} as any)
    ).rejects.toThrow("Full name is required");
  });

  it("should throw error if JWT_SECRET is not configured", async () => {
    (getJwtSecret as jest.Mock).mockImplementation(() => {
      throw new Error("JWT_SECRET not configured");
    });

    await expect(
      register!(null as any, { input: mockInput }, mockContext as any, {} as any)
    ).rejects.toThrow("JWT_SECRET not configured");
  });

  it("should throw error if checkEmailExists throws error", async () => {
    (checkEmailExists as jest.Mock).mockRejectedValue(new Error("Email already exists"));

    await expect(register!(null as any, { input: mockInput }, mockContext as any, {} as any)).rejects.toThrow(
      "Email already exists"
    );
  });

  it("should throw generic error if unknown error thrown", async () => {
    (checkEmailExists as jest.Mock).mockRejectedValue("Something unexpected");
  
    await expect(register!(null as any, { input: mockInput }, mockContext as any, {} as any)).rejects.toThrow("Registration failed");
  });
});
