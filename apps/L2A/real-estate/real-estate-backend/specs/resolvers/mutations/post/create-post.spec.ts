import { createPost } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations";
import { POST_MODEL } from "apps/L2A/real-estate/real-estate-backend/src/models/post";
import { CreatePostInput } from "apps/L2A/real-estate/real-estate-backend/src/generated";

jest.mock("apps/L2A/real-estate/real-estate-backend/src/models/post");

describe("createPost", () => {
  const mockCreate = jest.fn();
  const mockPost = { _id: "123", title: "Test Post" };

  beforeAll(() => {
    (POST_MODEL.create as jest.Mock) = mockCreate;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const validInput: CreatePostInput = {
    title: "Sample title",
    description: "Sample description",
    garage: true,
    price: 100000,
    propertyOwnerId: "user123", 
  };
  const userContext = {
    user: { _id: "user123", email: "test@example.com" }
  };

  it("should throw error if user is not authenticated", async () => {
    await expect(
      createPost({}, { input: validInput }, { user: null })
    ).rejects.toThrow("Unauthorized");
  });

  it("should create a post with garage = true", async () => {
    mockCreate.mockResolvedValue(mockPost);

    const result = await createPost({}, { input: validInput }, userContext);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        ...validInput,
        garage: true,
        propertyOwnerId: userContext.user._id,
        status: "PENDING",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
    expect(result).toEqual(mockPost);
  });

  it("should create a post with garage = false if undefined", async () => {
    const inputWithoutGarage = { ...validInput, garage: undefined };
    mockCreate.mockResolvedValue(mockPost);

    const result = await createPost({}, { input: inputWithoutGarage }, userContext);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        ...inputWithoutGarage,
        garage: false,
        propertyOwnerId: userContext.user._id,
        status: "PENDING",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
    expect(result).toEqual(mockPost);
  });
});
