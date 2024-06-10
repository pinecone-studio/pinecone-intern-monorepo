import { StudentsModel } from '@/graphql/models/student.models';
import { GraphQLError } from 'graphql';
import { updateStudent } from '@/graphql/resolvers/mutations/update-student';

jest.mock('@/graphql/models/student.models', () => ({
  StudentsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateStudent resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a student', async () => {
    const _id = 'someId';
    const updateInput = {
      _id,
      firstName: 'John',
      lastName: 'Doe',
      studentCode: 'S123',
      profileImgUrl: 'example.com/profile.jpg',
      classId: 'classId',
    };

    StudentsModel.findByIdAndUpdate.mockResolvedValue({ _id });
    const result = await updateStudent(null, { updateInput });
    expect(StudentsModel.findByIdAndUpdate);
    expect(result).toEqual(_id);
  });

  it('should throw an error if student update fails', async () => {
    const _id = 'someId';
    const updateInput = {
      _id,
      firstName: 'John',
      lastName: 'Doe',
      studentCode: 'S123',
      profileImgUrl: 'example.com/profile.jpg',
      classId: 'classId',
    };
    StudentsModel.findByIdAndUpdate.mockRejectedValue(new Error('Cannot update student'));
    await expect(updateStudent(null, { updateInput })).rejects.toThrow(GraphQLError);
  });

  it('should throw a "Could not find Student" error if student not found', async () => {
    const _id = 'someId';
    const updateInput = {
      _id,
      firstName: 'John',
      lastName: 'Doe',
      studentCode: 'S123',
      profileImgUrl: 'example.com/profile.jpg',
      classId: 'classId',
    };
    StudentsModel.findByIdAndUpdate.mockResolvedValue(null);
    await expect(updateStudent(null, { updateInput })).rejects.toThrowError('Cannot update student');
  });
});
