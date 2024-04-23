import { QueryResolvers } from "@/graphql/generated"
import { ArticleModel } from "@/models/article.model"
import { errorTypes, graphqlErrorHandler,} from "../error"

export const getArticleByID:QueryResolvers["getArticleByID"]  = async (_, {id}) => {
    try {
        const article = await ArticleModel.findById(id)
        if (!article) {
            throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
        }
        
        return article
    } catch (error) {
        throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
}