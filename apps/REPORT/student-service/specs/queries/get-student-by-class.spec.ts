import { StudentsModel } from '@/graphql/models/student.models';
import { getStudentsByClassId } from '@/graphql/resolvers/queries/get-student-by-class';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/student.models', () => ({
  StudentsModel: {
    find: jest.fn(),
  },
}));

describe('getStudentsByClassId resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return students when found by classId', async () => {
    const classId = 'yourClassId';
    const expectedStudents = { _id: '1', name: 'John Doe', classId: classId };
    StudentsModel.find.mockResolvedValue(expectedStudents);

    const result = await getStudentsByClassId(null, { classId: classId });

    expect(result).toEqual(expectedStudents);
    expect(StudentsModel.find).toHaveBeenCalledWith({ classId: classId });
  });

  it('should throw GraphQLError when no students found', async () => {
    const classId = 'yourClassId';
    StudentsModel.find.mockResolvedValue(null);

    await expect(getStudentsByClassId(null, { classId: classId })).rejects.toThrow(GraphQLError);
    expect(StudentsModel.find).toHaveBeenCalledWith({ classId: classId });
  });

  it('should throw GraphQLError when an error occurs', async () => {
    const classId = 'yourClassId';
    const errorMessage = 'An error occurred';
    StudentsModel.find.mockRejectedValue(new Error(errorMessage));

    await expect(getStudentsByClassId(null, { classId: classId })).rejects.toThrow(GraphQLError);
    expect(StudentsModel.find).toHaveBeenCalledWith({ classId: classId });
  });
});
