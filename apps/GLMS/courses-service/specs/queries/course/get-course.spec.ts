import { getCourse } from '@/graphql/resolvers/queries';

jest.mock('@/models/courses', () => ({
  CoursesModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        title: 'testTitle1',
        thumbnail: 'testThumbnail1',
        content: 'testContent1',
      })
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));

describe('Get Course', () => {
  it('should return a course when found', async () => {
    const result = await getCourse({}, { _id: '1' });
    expect(result).toEqual({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });
  });

  it('should handle errors when the database fails', async () => {
    await expect(getCourse({}, { _id: '1' })).rejects.toThrow('Database error');
  });
});
