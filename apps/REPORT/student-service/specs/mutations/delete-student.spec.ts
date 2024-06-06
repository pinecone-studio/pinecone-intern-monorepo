import { StudentsModel } from '@/graphql/models/student.models';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { deleteStudent } from '../../src/graphql/resolvers/mutations/delete-student';

jest.mock('@/graphql/models/student.models', () => ({
  StudentsModel: {
    findOneAndDelete: jest.fn(),
  },
}));

describe('deleteStudent resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a student and return success message', async () => {
    const input = { _id: 'studentId' };
    (StudentsModel.findOneAndDelete as jest.Mock).mockResolvedValue(input);

    const result = await deleteStudent!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('studentId');
    expect(StudentsModel.findOneAndDelete).toHaveBeenCalledWith(input);
  });

  it('should throw GraphQLError when no student found', async () => {
    const input = { id: 'studentId' };
    StudentsModel.findOneAndDelete.mockResolvedValue(null);

    await expect(deleteStudent(null, { input })).rejects.toThrow(GraphQLError);
    expect(StudentsModel.findOneAndDelete).toHaveBeenCalledWith(input);
  });

  it('should throw GraphQLError when an error occurs', async () => {
    const input = { id: 'studentId' };
    const errorMessage = 'An error occurred';
    StudentsModel.findOneAndDelete.mockRejectedValue(new Error(errorMessage));

    await expect(deleteStudent(null, { input })).rejects.toThrow(GraphQLError);
    expect(StudentsModel.findOneAndDelete).toHaveBeenCalledWith(input);
  });
});
