import { QueryResolvers } from "@/graphql/generated";
import { categoryModel } from "@/models/category.model";
import { GraphQLError } from "graphql";

export const getCategories:QueryResolvers['getCategories'] = async () => {
    try {
        const data = await categoryModel.find({})
        return data
    } catch (error) {
        throw new GraphQLError('error')
    }
}
