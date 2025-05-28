import { CreatePostInput } from "../../../generated";
import { POST_MODEL } from "../../../models/post";
export const createPost = async (_: any, args: { input: CreatePostInput }) => {
  const {
    garage,
  } = args.input;

  const newPost = await POST_MODEL.create({
    ...args.input, 
    garage: garage || false,
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newPost;
};



