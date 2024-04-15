import lessonModel from '@/model/create-course-model';
export const getLessons = async () => {
  return await lessonModel.find();
};
