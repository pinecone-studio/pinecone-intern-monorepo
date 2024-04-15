import { createContents } from '@/graphql/resolvers/mutations';
import contentModel from '@/model/create-content-model';

jest.mock('@/model/create-content-model', () => ({
    create: jest.fn(),
  }));
  describe('createContents resolver', () => {
      const mockInput = {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'test-image-url',
      };
  
      const mockOutput = {
        _id: 'mocked-id',
        title: mockInput.title,
        description: mockInput.description,
        contentImage: mockInput.contentImage,
      };
  
      contentModel.create.mockResolvedValue(mockOutput);
  
   t
      const result = await createContents({}, mockInput);

      expect(contentModel.create).toHaveBeenCalledWith(mockInput);
  
      expect(result).toEqual(mockOutput);
    });
  
    it('should throw an error when content creation fails', async () => {

      const mockInput = {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'test-image-url',
      };
  
    
      const mockError = new Error('Test error message');
      contentModel.create.mockRejectedValue(mockError);
  

      await expect(createContents({}, mockInput)).rejects.toThrowError(mockError);
    });
