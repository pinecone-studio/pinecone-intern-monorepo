import { getCourses } from '@/graphql/resolvers/queries';
import { CoursesModel } from '@/models/courses.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/courses.model', () => ({
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

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';

    (CoursesModel.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getCourses!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
