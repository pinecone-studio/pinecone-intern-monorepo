import { POST_MODEL } from "../../../models/post";
export const deletePostById = async (_: any, args: {_id: string }) => {
  const { _id } = args;
  const deletedPost = await POST_MODEL.findByIdAndDelete(_id);
  if (!deletedPost) {
    throw new Error("Post not found");
  }
  return deletedPost;
}