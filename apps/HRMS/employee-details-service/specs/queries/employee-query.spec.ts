import { getEmployeeDetails } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo, GraphQLError } from 'graphql';
import { errorTypes } from '@/graphql/resolvers/error';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findById: jest.fn().mockReturnValue({
      lean: jest
        .fn()
        .mockResolvedValueOnce({
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          department: 'SOFTWARE',
          jobTitle: 'Engineer',
          ladderLevel: 'Senior',
        })
        .mockResolvedValueOnce(null)
        .mockRejectedValueOnce(new Error('Database error')),
    }),
  },
}));

jest.mock('@/graphql/resolvers/error', () => {
  const originalModule = jest.requireActual('@/graphql/resolvers/error');
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn((errorMessage, errorType) => {
      const { GraphQLError } = jest.requireActual('graphql');
      return new GraphQLError(errorMessage.message, {
        extensions: {
          code: errorType.errorCode,
          http: { status: errorType.errorStatus },
        },
      });
    }),
  };
});

describe('getEmployeeDetails', () => {
  it('should return employee details if employee exists', async () => {
    const result = await getEmployeeDetails({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'SOFTWARE',
      jobTitle: 'Engineer',
      ladderLevel: 'Senior',
    });
  });

  it('should throw error if employee does not exist', async () => {
    await expect(getEmployeeDetails({}, { id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    try {
      await getEmployeeDetails({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        expect(error.message).toBe('Алдаа гарлаа');
        expect(error.extensions.code).toBe(errorTypes.INTERVAL_SERVER_ERROR.errorCode);
      } else {
        throw error;
      }
    }
  });

  it('should handle database errors gracefully', async () => {
    await expect(getEmployeeDetails({}, { id: '2' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    try {
      await getEmployeeDetails({}, { id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        expect(error.message).toBe('Алдаа гарлаа');
        expect(error.extensions.code).toBe(errorTypes.INTERVAL_SERVER_ERROR.errorCode);
      } else {
        throw error;
      }
    }
  });
});
