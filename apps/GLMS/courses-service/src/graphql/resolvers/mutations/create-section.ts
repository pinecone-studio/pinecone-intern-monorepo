import { MutationResolvers } from '@/graphql/generated';
import sectionModel from '@/model/section-model';
import { GraphQLError } from 'graphql';

export const createSection:MutationResolvers['createSection'] =  async (_,{sectionInput}) =>{
try {
    const newContent = await sectionModel.create(sectionInput)
    return newContent
} catch (error:unknown) {
    throw new GraphQLError('cannot find content'); 
    }
}