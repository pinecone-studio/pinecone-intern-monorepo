import { deleteClass } from '@/graphql/resolvers/mutations';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models/class.model', () => ({
  ClassModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('Delete Class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a class', async () => {
    const deletedClass = {
      _id: '1',
      name: 'test',
      teachers: ['teacher1', 'teacher2'],
      endDate: '2024-06-05',
      startDate: '2024-07-06',
      classType: 'CODING',
    };
    (ClassModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedClass);

    const result = await deleteClass({}, { classId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(deletedClass);
  });
  it('should throw a GraphQLError when topic is not found', async () => {
    (ClassModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteClass({}, { classId: '1' })).rejects.toThrow(GraphQLError);
    expect(ClassModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it("should throw an error if the class doesn't exist", async () => {
    (ClassModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
    await expect(deleteClass({}, { classId: '1' })).rejects.toThrow('Failed to delete class');
    expect(ClassModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
