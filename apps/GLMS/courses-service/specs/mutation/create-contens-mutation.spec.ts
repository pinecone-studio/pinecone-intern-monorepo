import { createContents } from '@/graphql/resolvers/mutations';
import contentModel from '@/model/create-content-model';

jest.mock('@/model/create-content-model', () => ({
  create: jest.fn(),
}));

describe('createContents resolver', () => {
  beforeEach(() => {
      jest.clearAllMocks();
  });

  it('should create content with provided data', async () => {
      const mockInput = {
          title: 'Test Title',
          description: 'Test Description',
          contentImage: 'Test Image URL'
      };

      const mockNewContent = {
          _id: '321321',
          title:mockInput.title,
          description:mockInput.description,
          contentImage:mockInput.contentImage,
            toObject: jest.fn(),
      };

      (contentModel.create as jest.Mock).mockResolvedValue(mockNewContent);
      const result = await createContents({}, mockInput);

      expect(contentModel.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockNewContent.toObject());
  });


  it('should throw an unknown error if the error type is not recognized', async () => {
      const mockInput = {
          title: 'Test Title',
          description: 'Test Description',
          contentImage: 'Test Image URL'
      };

      (contentModel.create as jest.Mock).mockRejectedValue('Unknown error');

      await expect(createContents({}, mockInput)).rejects.toThrow('An unknown error occurred');
  });
});