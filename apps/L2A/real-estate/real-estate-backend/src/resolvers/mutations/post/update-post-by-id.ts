import { POST_MODEL } from "../../../models/post";

export const updatePostById = async(_: any, args: { _id: string; input: any }) => {
  const { _id, input } = args;
  const updatedPost = await POST_MODEL.findByIdAndUpdate(
   _id,
    { ...input, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedPost) {
    throw new Error("Post not found");
  }
  return updatedPost;
};