import { MutationResolvers } from "../../../generated";
import { commentsModel } from "../../../models";

export const updateComment: MutationResolvers['updateComment'] = async (_, {input, _id}) => {
    const response = await commentsModel.findByIdAndUpdate(_id, input, {new: true})

    if (!response) {
        throw new Error('comment not found');
      }
    
    return response;
}