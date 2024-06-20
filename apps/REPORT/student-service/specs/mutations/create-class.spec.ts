import { createClass } from '@/graphql/resolvers/mutations';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models/class.model', () => ({
  ClassModel: {
    create: jest.fn(),
  },
}));

describe('Create Class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a class', async () => {
    const mockInput = {
      name: 'Test Class',
      teachers: ['Teacher 1', 'Teacher 2'],
      endDate: '2024-06-14',
      startDate: '2024-07-14',
      classType: 'CODING',
    };

    const mockCreatedClass = {
      _id: '1',
      ...mockInput,
    };

    // Mocking successful creation
    (ClassModel.create as jest.Mock).mockResolvedValue(mockCreatedClass);

    const result = await createClass({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    expect(ClassModel.create).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockCreatedClass);
  });

  it('should throw an error if creation fails', async () => {
    const mockInput = {
      name: 'Test Class',
      teachers: ['Teacher 1', 'Teacher 2'],
      endDate: '2024-06-14',
      startDate: '2024-07-14',
      classType: 'CODING',
    };
    (ClassModel.create as jest.Mock).mockRejectedValue(new Error('Failed to create class'));
    await expect(createClass({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    await expect(createClass({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to create class');

    expect(ClassModel.create).toHaveBeenCalledWith(mockInput);
  });
});
