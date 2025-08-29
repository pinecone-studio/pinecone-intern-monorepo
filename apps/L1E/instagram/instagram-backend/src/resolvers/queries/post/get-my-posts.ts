import { Post } from "src/models/post.model";

type EmptyArgs = Record<string, never>;

export const getMyPosts = async (
    _: unknown,
    __: EmptyArgs,
    context: { userId?: string | null }
) => {
    const userId = context?.userId;
    if (!userId) {
        throw new Error("Unauthorized: please login to view your posts");
    }
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    return posts;
}