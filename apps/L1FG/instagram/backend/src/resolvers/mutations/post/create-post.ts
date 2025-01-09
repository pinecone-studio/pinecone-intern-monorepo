import { MutationResolvers } from "../../../generated";
import { PostModel } from "../../../models";

export const createPost:MutationResolvers['createPost'] =async(_, {input})=>{
const {postImage, caption, userId, carouselMediaCount} = input
const post = await PostModel.create({
    postImage, caption, userId, carouselMediaCount
})

return post
}