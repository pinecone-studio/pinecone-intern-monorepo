import { MutationResolvers } from '@/graphql/generated';
import contentModel from '@/model/create-content-model';

export const createContents:MutationResolvers['createContents'] =  async (_,{title, description, contentImage,}) =>{
try {
    const newContent = await contentModel.create({title,description,contentImage})
    return newContent.toObject()
} catch (error:unknown) {
    if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('An unknown error occurred');
      }
    }
}

  