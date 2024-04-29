import courseModel from "@/model/course-model";
import { GraphQLError } from 'graphql';
export const getCourses =  async () =>{
    try {
        return await courseModel.find();
    } catch (error) {
        throw new GraphQLError('cannot find course')
    }
}