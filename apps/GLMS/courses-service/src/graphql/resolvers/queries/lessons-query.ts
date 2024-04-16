import lessonModel from '@/model/create-lesson-model';
export const getLessons = async () => {
  try {
    return await lessonModel.find();
  } catch (error) {
    throw new Error("cannot find lesson")
  }

};
