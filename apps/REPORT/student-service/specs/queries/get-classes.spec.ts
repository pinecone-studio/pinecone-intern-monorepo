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

  it('should return classes', async () => {
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

    const result = await getClasses!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockClasses);
  });

  it('should throw garphql error when error occurs ', async () => {
    const errorMessage = "Couldn't find classes";
    (ClassModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getClasses!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    await expect(getClasses!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
