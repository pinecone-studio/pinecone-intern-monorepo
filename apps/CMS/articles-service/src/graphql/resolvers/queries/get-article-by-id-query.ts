import { QueryResolvers } from "@/graphql/generated"
import { ArticleModel } from "@/models/article.model"
import { errorTypes, graphqlErrorHandler,} from "../error"

export const getArticleByID:QueryResolvers["getArticleByID"]  = async (_, {id}) => {
    try {
        const articles = await ArticleModel.findById(id)
        if (!articles) {
            throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
        }
        return articles
    } catch (error) {
        throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
}