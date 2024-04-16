import lessonModel from '@/model/create-lesson-model';
export const getCourses = async () => {
  return await lessonModel.find();
};
