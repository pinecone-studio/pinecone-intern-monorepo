import { QueryResolvers } from "@/graphql/generated"
import { articleModel } from "@/models/article.model"
import { errorTypes, graphqlErrorHandler,} from "../error"

export const getArticleByID:QueryResolvers["getArticleByID"]  = async (_, {id}) => {
    try {
        const articles = await articleModel.findById(id)
        return articles
    } catch (error) {
        throw graphqlErrorHandler({ message: 'Failed to get articles' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
}