import contentModel from '@/model/create-content-model';
export const getContents = async () => {
    try {
        return await contentModel.find();
    } catch (error) {
        throw new Error("cannot find content");
        
    }

};