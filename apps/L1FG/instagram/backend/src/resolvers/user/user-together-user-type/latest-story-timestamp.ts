import { UserTogetherUserTypeResolvers } from "../../../generated";
import { StoryModel } from "../../../models";

export const latestStoryTimestamp:UserTogetherUserTypeResolvers['latestStoryTimestamp']=async(parent,_,__)=>{
const  stories=await StoryModel.find({userId:parent._id,expiringAt:{
    $gte: new Date()
}}).sort({createdAt:-1});
if(!stories.length)
{
    return 0
}
const {createdAt}=stories[0]
return createdAt
} 