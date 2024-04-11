import { updateCourse } from '../../src/graphql/resolvers/mutations/update-course-mutation';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('updateCourse resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if course is not found', async () => {
    const _id = 'non_existing_course_id';
    const title = 'Updated Title';
    const content = 'Updated Content';
    const thumbnail = 'updated-thumbnail-url';

    (courseModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateCourse(null, { _id, title, content, thumbnail })).rejects.toThrow('Course not found');
  });
});
