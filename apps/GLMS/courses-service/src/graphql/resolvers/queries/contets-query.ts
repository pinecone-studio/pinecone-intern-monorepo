import contentModel from '@/model/create-content-model';
export const getContents = async () => {
  return await contentModel.find();
};