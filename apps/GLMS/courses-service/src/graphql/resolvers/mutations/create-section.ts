import { MutationResolvers } from '@/graphql/generated';
import sectionModel from '@/model/section-model';
import { GraphQLError } from 'graphql';

export const createSection:MutationResolvers['createSection'] =  async (_,{SectionInput}) =>{
try {
    const newContent = await sectionModel.create(SectionInput)
    return newContent.toObject()
} catch (error:unknown) {
    throw new GraphQLError('cannot find content'); 
    }
}