import { PostLikeModal } from "../../../models";

export const hasLiked=async({_id}:{_id:string},_:unknown,{userId}:{userId:string})=>{
const postLikeCount=await PostLikeModal.findOne({
    postId:_id,
    userId:userId
});
const hasLiked=postLikeCount ? true : false;
return hasLiked

} 