import { createSection } from '@/graphql/resolvers/mutations'; // Adjust the path as needed
import sectionModel from '@/model/section-model';
import { GraphQLError } from 'graphql';

jest.mock('@/model/section-model', () => ({
  insertMany: jest.fn(),
}));

describe('createSection resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a section with provided data', async () => {
    const mockInput = [
      {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL'
      }
    ];

    const mockNewSection = [
      {
        id: '123',
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL',
        createdAt: '2024-05-05T00:00:00.000Z' 
      }
    ];

    (sectionModel.insertMany as jest.Mock).mockResolvedValue(mockNewSection);

    const result = await createSection({}, { sectionInput: mockInput });

    expect(sectionModel.insertMany).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockNewSection);
  });

  it('should throw an error if section creation fails', async () => {
    const mockInput = [
      {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL'
      }
    ];

    const mockError = new Error('cannot find content');

    (sectionModel.insertMany as jest.Mock).mockRejectedValue(mockError);

    await expect(createSection({}, { sectionInput: mockInput })).rejects.toThrow(GraphQLError);
  });
  it('should throw an error if section creation fails', async () => {
    const mockInput = {
      title: 'Test Title',
      description: 'Test Description',
      contentImage: 'Test Image URL'
    };

    const mockError = new Error('cannot find content');

    (sectionModel.insertMany as jest.Mock).mockRejectedValue(mockError);

    await expect(createSection({}, { sectionInput: mockInput })).rejects.toThrow(GraphQLError);
  });
});
