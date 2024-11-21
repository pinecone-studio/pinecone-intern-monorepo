import { MutationResolvers, Response } from "../../../generated";
import { commentsModel } from "../../../models";

export const deleteComment: MutationResolvers['deleteComment'] = async (_, {_id}) => {
    const response = await commentsModel.findByIdAndDelete(_id)

    if (!response) {
        throw new Error('Comment not found');
      }
      
    return Response.Success;
}