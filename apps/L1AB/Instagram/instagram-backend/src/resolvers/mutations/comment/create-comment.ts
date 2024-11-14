import { MutationResolvers } from '../../../generated';
import { commentsModel } from '../../../models';

export const createComment: MutationResolvers['createComment'] = async (_: unknown, { input }) => {
    const response = await commentsModel.create(input);
    return response.toObject();
};
