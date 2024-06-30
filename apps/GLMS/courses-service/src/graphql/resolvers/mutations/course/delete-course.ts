import { MutationDeleteCourseArgs } from '@/graphql/generated';
import { CoursesModel } from '@/models/courses.model';
import { GraphQLError } from 'graphql';

export const deleteCourse = async (_: unknown, { id }: MutationDeleteCourseArgs) => {
  try {
    const deleteCourse = await CoursesModel.findByIdAndDelete(id);
    if (!deleteCourse) {
      throw new GraphQLError('Course not found');
    }
    return deleteCourse;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to delete a course: ${message}`);
  }
};
