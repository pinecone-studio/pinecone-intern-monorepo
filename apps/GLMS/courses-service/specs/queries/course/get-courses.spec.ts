import { getCourses } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/courses', () => ({
  CoursesModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        title: 'testTitle1',
        thumbnail: 'testThumbnail1',
        content: 'testContent1',
      },
    ]),
  },
}));

describe('Get Courses', () => {
  it('should return all courses', async () => {
    const result = await getCourses!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        title: 'testTitle1',
        thumbnail: 'testThumbnail1',
        content: 'testContent1',
      },
    ]);
  });
});
