/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getClassById } from '@/graphql/resolvers/queries';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLResolveInfo, GraphQLError } from 'graphql';

jest.mock('@/graphql/models/class.model', () => ({
  ClassModel: {
    findById: jest.fn(),
  },
}));

describe('getClassById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return class when found by classId', async () => {
    const mockClass = {
      _id: '1',
      name: 'test',
      teachers: ['teacher1', 'teacher2'],
      endDate: '2024-6-14',
      startDate: '2024-5-14',
      classType: 'CODING',
    };

    (ClassModel.findById as jest.Mock).mockResolvedValue(mockClass);

    const result = await getClassById!({}, { classId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockClass);
  });
  it('should throw GraphQLError when no class found', async () => {
    (ClassModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getClassById!({}, { classId: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    expect(ClassModel.findById).toHaveBeenCalledWith('1');
  });
  it('should throw GraphQLError when an error occurs', async () => {
    const errorMessage = 'Error occured while fetching class';
    (ClassModel.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getClassById!({}, { classId: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    expect(ClassModel.findById).toHaveBeenCalledWith('1');
  });
});
