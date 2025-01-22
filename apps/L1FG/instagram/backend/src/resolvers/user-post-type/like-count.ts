import { PostLikeModal } from "../../models"

export const likeCount=async({_id}:{_id:string},_:unknown,__:unknown)=>{
const posts=await PostLikeModal.find({
    postId:_id
});
const count=posts.length
return count

}