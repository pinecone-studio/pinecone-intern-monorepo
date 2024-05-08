import { createCourse } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

const mockInput = {
  title: 'English',
  description: 'Learning english',
  thumbnail: 'course-thumbnail.jpg',
  status: 'Noorog',
};

jest.mock('../../../courses-service/src/model/course-model.ts', () => ({
  create: jest
    .fn()
    .mockReturnValueOnce({
      title: 'English',
      description: 'Learning english',
      thumbnail: 'course-thumbnail.jpg',
      status: 'Noorog',
    })
    .mockRejectedValueOnce(new Error('An unknown error occurred')),
}));

describe('Create Course', () => {
  it('1.it should create new course', async () => {
    const result = await createCourse!({}, { courseInput: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockInput);
  });

  it('2.it should throw error', async () => {
    try {
      await createCourse!({}, { courseInput: mockInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('An unknown error occurred'));
    }
  });
});
