// index.spec.ts
import { createPost } from "src/resolvers/mutations";
import cloudinary from "src/utils/cloudinary";
import { Post } from "src/models";


jest.mock("src/utils/cloudinary", () => ({
  uploader: {
    upload: jest.fn(),
  },
}));


jest.mock("src/models", () => ({
  Post: jest.fn(),
}));

describe("createPost mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uploads images to Cloudinary and saves a post", async () => {
    (cloudinary.uploader.upload as jest.Mock)
      .mockResolvedValueOnce({ SECURE_URL: "https://cloudinary.com/img1.jpg" })
      .mockResolvedValueOnce({ SECURE_URL: "https://cloudinary.com/img2.jpg" });

    const mockSave = jest.fn();
    // Make the mock return an object that keeps the passed-in fields
    (Post as unknown as jest.Mock).mockImplementation((doc) => ({
      ...doc,
      save: mockSave,
    }));

    const result = await createPost(null, {
      image: ["imgBase64-1", "imgBase64-2"],
      description: "Test description",
    });

    expect(cloudinary.uploader.upload).toHaveBeenCalledTimes(2);
    expect(Post).toHaveBeenCalledWith({
      image: [
        "https://cloudinary.com/img1.jpg",
        "https://cloudinary.com/img2.jpg",
      ],
      description: "Test description",
    });
    expect(mockSave).toHaveBeenCalled();
    expect(result.image).toEqual([
      "https://cloudinary.com/img1.jpg",
      "https://cloudinary.com/img2.jpg",
    ]);
  });
});
