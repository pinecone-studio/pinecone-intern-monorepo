import courseModel from '@/model/create-course-model';
export const getCourses = async () => {
  return await courseModel.find();
};
