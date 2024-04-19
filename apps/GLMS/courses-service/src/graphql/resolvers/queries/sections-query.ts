import sectionModel from '@/model/section-model';
import { GraphQLError } from 'graphql';

export const getSections = async () => {
    try {
        return await sectionModel.find();
    } catch (error) {
        throw new GraphQLError('cannot find content'); 
    }
};