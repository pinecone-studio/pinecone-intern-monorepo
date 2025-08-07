import { login } from "src/resolvers/mutations/user/login";
import { User } from "src/models";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
jest.mock("src/models", ()=>({
    User: {
        findOne: jest.fn(),
    },
}));

jest.mock("jsonwebtoken",()=>({
    __esModule: true, // This is crucial for mocking default exports in Jest
    default: {
        sign: jest.fn(),
    },
}))

jest.mock("bcrypt", ()=> ({
    compareSync:jest.fn(),
}))

describe("login resolver", () => {
    const mockInput = {
        email: "test@gmail.com",
        password: "test123"
    }
    const mockUser = {
        _id: "123",
        email: "test@gmail.com",
        password: "test123"
    }
    const mockContext = {};

beforeEach(()=>{
    jest.clearAllMocks();
    process.env.JWT_SECRET = "testsecret";
});

it("should login successfully with correct credentials", async () => {
    const foundUser = { _id: "123", ...mockInput };

    (jwt.sign as jest.Mock).mockReturnValue("token123");
    (User.findOne as jest.Mock).mockResolvedValue(foundUser);
    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

    const result = await login!(null as any, { input: mockInput }, mockContext as any, {} as any);

    expect(jwt.sign).toHaveBeenCalledWith({ userId: "123" }, "testsecret");
    expect(User.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(bcrypt.compareSync).toHaveBeenCalledWith(mockInput.password, foundUser.password);

    expect(result).toEqual({
        user: foundUser,
        token: "token123",
    });
});

    it("should throw error if email is missing", async () => {
        const input = { ...mockInput, email: "" };
        await expect(login!(null as any, { input }, mockContext as any, {}as any)
    ).rejects.toThrow("Email is required");
    });
    it("should throw error if password is missing", async ()=>{
        const input = {...mockInput, password: ""}
        await expect (
            login!(null as any, {input}, mockContext as any, {}as any)
        ).rejects.toThrow("Password is required")
    });
    it("should be throw error if JWT_SECRET is not configured", async ()=>{
        delete process.env.JWT_SECRET;

        await expect(
            login!(null as any, {input:mockInput}, mockContext as any, {}as any)
        ).rejects.toThrow("JWT_SECRET not configured")
    })
    it("should throw error if user not found", async ()=>{
        (User.findOne as jest.Mock).mockResolvedValue(null);
        await expect (
            login!(null as any, {input:mockInput}, mockContext as any, {}as any)
        ).rejects.toThrow("Invalid credentials")
    })
    it("should throw error if password doesn't match", async ()=>{
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
        await expect (
            login!(null as any, {input:mockInput}, mockContext as any, {}as any)
        ).rejects.toThrow("Invalid credentials")
    });
    it("should throw 'Login failed' if non-error thrown", async () => {
        (User.findOne as jest.Mock).mockRejectedValue("some string error"); // not an Error object
    
        await expect(
            login!(null as any, {input:mockInput}, mockContext as any, {}as any)
    ).rejects.toThrow("Login failed");
      });
})

