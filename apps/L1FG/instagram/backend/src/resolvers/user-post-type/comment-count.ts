import { CommentModel } from "../../models/comment.model";
export const commentCount=async({_id}:{_id:string},_:unknown,__:unknown)=>{
    const posts=await CommentModel.find({ postId:_id});
    const count=posts.length;
    return count
}