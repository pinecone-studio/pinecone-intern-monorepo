import { MutationResolvers } from "../../../generated";
import { PostLikeModal } from "../../../models";

export const createPostLike:MutationResolvers['createPostLike']=async(_, {input})=>{
    const {userId, postId} = input

    const postLike = await PostLikeModal.create({
        userId, postId
    })

    return postLike
}