import { GraphQLError } from 'graphql';
import sectionModel from '@/model/section-model';
export const getSections = async () => {
    try {
        return await sectionModel.find();
    } catch (error) {
        throw new GraphQLError('cannot find content'); 
    }

};