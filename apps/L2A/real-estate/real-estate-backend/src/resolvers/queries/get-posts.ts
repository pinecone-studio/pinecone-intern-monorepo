import { POST_MODEL } from "../../models/post";

export const getPosts = async () => {
  try {
    const posts = await POST_MODEL.find()
    return posts;
  } catch (error) {
    console.error(error);
    return []; 
  }
};

