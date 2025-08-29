import { Post } from "src/models/post.model";

export const getPosts = async () => {
    const posts = await Post.find();
    return posts;
}