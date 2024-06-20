import { CoursesModel } from '@/models/courses';

const courseQuery = {
  getCourses: async () => {
    return await CoursesModel.find({});
  },
};

module.exports = courseQuery;
