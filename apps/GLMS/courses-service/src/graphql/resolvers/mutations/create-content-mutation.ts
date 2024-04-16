import { MutationResolvers } from '@/graphql/generated';
import contentModel from '@/model/create-content-model';
import { GraphQLError } from 'graphql';

export const createContents:MutationResolvers['createContents'] =  async (_,{title, description, contentImage}) =>{
try {
    const newContent = await contentModel.create({title,description,contentImage})
    return newContent.toObject()
} catch (error:unknown) {
    throw new GraphQLError('An unknown error occurred'); 
    }
}