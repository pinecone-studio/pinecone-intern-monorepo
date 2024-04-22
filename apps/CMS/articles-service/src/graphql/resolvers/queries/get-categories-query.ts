import { QueryResolvers } from "@/graphql/generated";
import { categoryModel } from "@/models/category.model";
import { GraphQLError } from "graphql";

export const getCategories:QueryResolvers['getCategories'] = async () => {
    try {
        const categories = await categoryModel.find({})
        return categories
    } catch (error) {
        throw new GraphQLError('error')
    }
}
