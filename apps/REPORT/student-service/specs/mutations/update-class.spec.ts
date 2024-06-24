import { updateClass } from '@/graphql/resolvers/mutations';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/class.model', () => ({
  ClassModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('Update Class', () => {
  const mockClass = {
    _id: '1',
    name: 'Updated Class',
    teachers: ['teacher1', 'teacher2'],
    endDate: '2024-06-05',
    startDate: '2024-07-06',
    classType: 'CODING',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a class', async () => {
    (ClassModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockClass);

    const input = {
      _id: '1',
      name: 'Updated Class',
      teachers: ['teacher1', 'teacher2'],
      endDate: '2024-06-05',
      startDate: '2024-07-06',
      classType: 'CODING',
    };

    const result = await updateClass({}, { input });

    expect(ClassModel.findByIdAndUpdate).toHaveBeenCalledWith(
      input._id,
      {
        name: input.name,
        teachers: input.teachers,
        endDate: input.endDate,
        startDate: input.startDate,
        classType: input.classType,
      },
      { new: true }
    );
    expect(result).toEqual(mockClass);
  });

  it('should send an error when class is not found', async () => {
    (ClassModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const input = {
      _id: '1',
      name: 'Updated Class',
      teachers: ['teacher1', 'teacher2'],
      endDate: '2024-06-05',
      startDate: '2024-07-06',
      classType: 'CODING',
    };

    await expect(updateClass({}, { input })).rejects.toThrow(GraphQLError);
    expect(ClassModel.findByIdAndUpdate).toHaveBeenCalledWith(
      input._id,
      {
        name: input.name,
        teachers: input.teachers,
        endDate: input.endDate,
        startDate: input.startDate,
        classType: input.classType,
      },
      { new: true }
    );
  });

  it('should send an error when class update fails', async () => {
    (ClassModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Failed to update class'));

    const input = {
      _id: '1',
      name: 'Updated Class',
      teachers: ['teacher1', 'teacher2'],
      endDate: '2024-06-05',
      startDate: '2024-07-06',
      classType: 'CODING',
    };

    await expect(updateClass({}, { input })).rejects.toThrow('Failed to update class');
    expect(ClassModel.findByIdAndUpdate).toHaveBeenCalledWith(
      input._id,
      {
        name: input.name,
        teachers: input.teachers,
        endDate: input.endDate,
        startDate: input.startDate,
        classType: input.classType,
      },
      { new: true }
    );
  });
});
