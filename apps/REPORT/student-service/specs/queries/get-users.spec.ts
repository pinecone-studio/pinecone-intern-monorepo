import { UserModel } from '@/graphql/models/user.models';
import { getUsers } from '@/graphql/resolvers/queries';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    find: jest.fn(),
  },
}));

describe('Get user by query', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return users', async () => {
    const expectedUsers = [{ _id: '1', firstName: 'John Doe', lastName: 'Baldan', email: 'baldan@yahoo.com', password: 'baldan123', role: 'STUDENT' }];
    UserModel.find.mockResolvedValue(expectedUsers);

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
