import { createCourse } from '@/graphql/resolvers/mutations';

jest.mock('@/models/courses', () => ({
  CoursesModel: {
    create: jest.fn().mockResolvedValue({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    }),
  },
}));

const input = {
  title: 'testTitle1',
  thumbnail: 'testThumbnail1',
  content: 'testContent1',
};

describe('Create Course', () => {
  it('should create a course', async () => {
    const result = await createCourse({}, { createInput: input });

    expect(result).toEqual({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });
  });
});
