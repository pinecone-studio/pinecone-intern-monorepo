import { StudentsModel } from '@/graphql/models/student.models';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { deleteStudent } from '../../src/graphql/resolvers/mutations/delete-student';

jest.mock('@/graphql/models/student.models', () => ({
  StudentsModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteStudent resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a student and return success message', async () => {
    const input = { _id: 'studentId' };
    (StudentsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(input);

    const result = await deleteStudent!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('studentId');
  });

  it('should throw GraphQLError when no student found', async () => {
    const input = { _id: 'studentId' };
    StudentsModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(deleteStudent(null, { input })).rejects.toThrow(GraphQLError);
  });

  it('should throw GraphQLError when an error occurs', async () => {
    const input = { _id: 'studentId' };
    const errorMessage = 'An error occurred';
    StudentsModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await expect(deleteStudent(null, { input })).rejects.toThrow(GraphQLError);
  });
});
