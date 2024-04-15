import courseModel from '@/model/create-course-model';
export const getLessons = async () => {
  return await courseModel.find();
};
