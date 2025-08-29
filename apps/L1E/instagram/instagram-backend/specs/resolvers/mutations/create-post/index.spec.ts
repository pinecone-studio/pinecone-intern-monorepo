// apps/L1E/instagram/instagram-backend/specs/resolvers/mutations/create-post/index.spec.ts
import { createPost } from "src/resolvers/mutations";
import { Post } from "src/models";
import cloudinary from "src/utils/cloudinary";

jest.mock("src/utils/cloudinary");
jest.mock("src/models");
/* eslint-disable camelcase */
describe("createPost mutation", () => {
  it("uploads images to Cloudinary and saves a post", async () => {
    // Mock Cloudinary uploader
    (cloudinary.uploader.upload as jest.Mock).mockImplementation((img: string) => {
      return Promise.resolve({ secure_url: `https://cloudinary.com/${img}` });
    });
/* eslint-disable camelcase */
    // Mock Post constructor and save method
    const mockSave = jest.fn().mockResolvedValue(true);
    (Post as unknown as jest.Mock).mockImplementation((data) => ({
      ...data,
      save: mockSave,
    }));

const result = await createPost(
  null,
  {
    image: ["img1.jpg", "img2.jpg"],
    description: "Test description",
  },
  { userId: "mockUserId" }   // 👈 add this
);


// Assertions
expect(cloudinary.uploader.upload).toHaveBeenCalledTimes(2);
expect(cloudinary.uploader.upload).toHaveBeenCalledWith("img1.jpg", { folder: "posts" });
expect(cloudinary.uploader.upload).toHaveBeenCalledWith("img2.jpg", { folder: "posts" });

expect(Post).toHaveBeenCalledWith({
  image: ["https://cloudinary.com/img1.jpg", "https://cloudinary.com/img2.jpg"],
  description: "Test description",
  user: "mockUserId",
  createdAt: expect.any(Date),
});

expect(mockSave).toHaveBeenCalled();
expect(result.image).toEqual(["https://cloudinary.com/img1.jpg", "https://cloudinary.com/img2.jpg"]);
expect(result.description).toBe("Test description");

  });
});
