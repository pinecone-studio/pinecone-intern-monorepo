import { MutationResolvers } from "../../../generated";
import { CommentLikeModel } from "../../../models";

export const createCommentLike:MutationResolvers['createCommentLike']=async(_, {input})=>{
    const {userId, commentId} = input

    const commentLike = await CommentLikeModel.create({
        userId, commentId
    })

    return commentLike
}