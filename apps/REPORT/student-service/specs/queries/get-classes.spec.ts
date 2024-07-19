/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getClasses } from '@/graphql/resolvers/queries';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLResolveInfo, GraphQLError } from 'graphql';

jest.mock('@/graphql/models/class.model', () => ({
  ClassModel: {
    find: jest.fn(),
  },
}));

describe('getClasses', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all classes when no search term is provided', async () => {
    const mockClasses = [
      {
        _id: '1',
        name: 'test',
        teachers: ['teacher1', 'teacher2'],
        endDate: '2024-6-14',
        startDate: '2024-5-14',
        classType: 'CODING',
      },
    ];

    (ClassModel.find as jest.Mock).mockResolvedValue(mockClasses);

    const result = await getClasses!({}, { search: undefined }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockClasses);
    expect(ClassModel.find).toHaveBeenCalledWith({});
  });

  it('should return filtered classes when search term is provided', async () => {
    const mockClasses = [
      {
        _id: '1',
        name: 'Coding Class',
        teachers: ['John Doe'],
        endDate: '2024-6-14',
        startDate: '2024-5-14',
        classType: 'CODING',
      },
    ];

    (ClassModel.find as jest.Mock).mockResolvedValue(mockClasses);

    const searchTerm = 'Coding';
    const result = await getClasses!({}, { search: searchTerm }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockClasses);
    expect(ClassModel.find).toHaveBeenCalledWith({
      $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { teachers: { $regex: searchTerm, $options: 'i' } }, { 'students.firstName': { $regex: searchTerm, $options: 'i' } }],
    });
  });

  it('should throw GraphQL error when error occurs', async () => {
    const errorMessage = "Couldn't find classes";
    (ClassModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getClasses!({}, { search: undefined }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    await expect(getClasses!({}, { search: undefined }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
