
  import cloudinary from "src/utils/cloudinary";
  import { Post } from "src/models";

  export const createPost = async (
    _: unknown,
    { image, description }: { image: string[]; description?: string },
    context: { userId?: string | null }
  ) => {
    const userId = context?.userId;
    if (!userId) {
      throw new Error("Unauthorized: please login to create a post");
    }
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
      user: userId,
      createdAt: new Date(),
    });

    await newPost.save();
   

    return newPost;
  };