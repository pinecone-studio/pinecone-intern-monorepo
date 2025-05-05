import { createPost } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations/post/create-post";
import { POST_MODEL } from "apps/L2A/real-estate/real-estate-backend/src/models/post";

jest.mock("apps/L2A/real-estate/real-estate-backend/src/models/post", () => ({
  POST_MODEL: {
    create: jest.fn(),
  },
}));

describe("createPost", () => {
  const mockPost = {
    _id: { toString: () => "mock-id" },
    propertyOwnerId: { toString: () => "owner-id" },
    title: "Test Title",
    description: "Test Description",
    price: 123456,
    propertyDetail: { toString: () => "property-detail-id" },
    status: "pending",
    updatedAt: { toString: () => "2023-01-01T00:00:00Z" },
    createdAt: { toString: () => "2023-01-01T00:00:00Z" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a post and return the correct result", async () => {
    (POST_MODEL.create as jest.Mock).mockResolvedValue(mockPost);

    const args = {
      input: {
        propertyOwnerId: "owner-id",
        title: "Test Title",
        description: "Test Description",
        price: 123456,
        propertyDetail: "property-detail-id",
      },
    };
    const result = await createPost(null, args);
    expect(POST_MODEL.create).toHaveBeenCalledWith({
      ...args.input,
      status: "pending",
    });

    expect(result).toEqual({
      id: "mock-id",
      propertyOwnerId: "owner-id",
      title: "Test Title",
      description: "Test Description",
      price: 123456,
      propertyDetail: "property-detail-id",
      status: "pending",
      updatedAt: "2023-01-01T00:00:00Z",
      createdAt: "2023-01-01T00:00:00Z",
    });
  });
});








