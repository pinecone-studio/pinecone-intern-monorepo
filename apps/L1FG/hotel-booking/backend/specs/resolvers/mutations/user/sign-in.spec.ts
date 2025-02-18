import { signIn } from "apps/L1FG/hotel-booking/backend/src/resolvers/mutations";
import { GraphQLResolveInfo } from "graphql";

jest.mock("../../../../src/models", () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValue({
      _id: "userId123",
      email: "test@example.com",
      password: "sdiufher9ou49inkjdsvnienkfv",  
    }),
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => {
    return "mocked-jwt-token";
  }),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValueOnce(false).mockResolvedValue(true),
}));


describe("signIn mutation", () => {
  const input = {
    email: "test@example.com",
    password: "password123",
  };

  it("should throw an error if user is not found", async () => {
    await expect(
      signIn!({}, { input }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow("User Not Found");
  });

  it("should throw an error if the password is incorrect", async () => {
    await expect(
      signIn!({}, { input }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow("Password is wrong");
  });

  it("should throw an error if session secret is not set", async () => {
    delete process.env.JWT_SECRET
    await expect(
      signIn!({}, { input }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow("Secret is not here bro");
  });

  it("should return user and token when sign-in is successful", async () => {
    process.env.JWT_SECRET = "mocked-secret";

    await expect(
      signIn!({}, { input }, {}, {} as GraphQLResolveInfo)
    ).resolves.toEqual({
      token: "mocked-jwt-token",
      user: {
        _id: "userId123",
        email: "test@example.com",
        password: "sdiufher9ou49inkjdsvnienkfv",
      },
    });
  });

  it("should throw an error if session secret is undefined", async () => {
    process.env.JWT_SECRET = "";

    await expect(
      signIn!({}, { input }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow("Secret is not here bro");
  });
});
