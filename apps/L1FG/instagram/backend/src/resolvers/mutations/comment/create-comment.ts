import { MutationResolvers } from "../../../generated";
import { CommentModel } from "../../../models/comment.model";

export const createComment:MutationResolvers['createComment'] =async(_, {input})=>{
const {userId, postId, comment,} = input

const comments = await CommentModel.create({
    userId, postId, comment
})

return comments
}