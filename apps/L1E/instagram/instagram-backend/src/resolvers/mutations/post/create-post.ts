// src/mutations/post/createpost.ts
import cloudinary from "src/utils/cloudinary";
import { Post } from "src/models";

export const createPost = async (_: unknown, { image, description }: { image: string[], description?: string }) => {
  const uploadedUrls: string[] = [];

  for (const img of image) {
    const uploadResponse = await cloudinary.uploader.upload(img, {
      folder: "posts",
    });
    uploadedUrls.push(uploadResponse.secure_url);
  }

  const newPost = new Post({
    image: uploadedUrls,
    description,
  });

  await newPost.save();
  return newPost;
};
