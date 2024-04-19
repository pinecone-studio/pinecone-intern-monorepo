import { CategoryModel } from "@/models/category.model";
import { GraphQLError } from "graphql";

export const categoryQuery = async () => {
    try {
        const data = await CategoryModel.find({})
        return data
    } catch (error) {
        throw new GraphQLError('error')
    }
}
