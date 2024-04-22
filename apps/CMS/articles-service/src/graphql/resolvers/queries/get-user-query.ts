import { UserModel } from "@/models"
import { GraphQLError } from "graphql"

export const getUser = async () => {
    try {
        const users = await UserModel.find()
        return users        
    } catch (error) {
        throw new GraphQLError('error')
    }
}