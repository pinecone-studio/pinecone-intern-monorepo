import {  GraphQLResolveInfo } from 'graphql';
import { getCourseById } from '@/graphql/resolvers/queries/get-course-by-id';

jest.mock('../../src/model/course-model', () => ({
  findById: jest.fn()
}));

jest.mock('../../src/model/course-model', () => ({
    findById: jest.fn().mockResolvedValueOnce({
      _id: 'mockCourseId',
      title: 'Test Course',
    }).mockResolvedValueOnce(null),
  }));
  
  describe('Get Course By Id', () => {
    it('should return a course', async () => {
      const result = await getCourseById!({}, { id: 'mockCourseId' }, {}, {} as GraphQLResolveInfo);
  
      expect(result).toEqual({
        _id: 'mockCourseId',
        title: 'Test Course',
      });
    });
  
    it("should throw an error if the course doesn't exist", async () => {
      try {
        await getCourseById!({}, { id: 'nonExistentId' }, {}, {} as GraphQLResolveInfo);
      } catch (error) {
        expect(error).toEqual(new Error('cannot find course'));
      }
    });
  });