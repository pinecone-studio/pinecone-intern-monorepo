import { UpdateCourseInput } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses.model';

export const updateCourse = async (_: unknown, { updateInput }: { updateInput: UpdateCourseInput }) => {
  const { id, ...updateFields } = updateInput;
  try {
    const updatedCourse = await CoursesModel.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return updatedCourse;
  } catch (error) {
    throw new Error('Error updating the course: ' + error);
  }
};
