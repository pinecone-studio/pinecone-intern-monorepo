import { createSection } from '@/graphql/resolvers/mutations';
import sectionModel from '@/model/section-model';

jest.mock('@/model/section-model', () => ({
  create: jest.fn(),
}));

describe('createContents resolver', () => {
  beforeEach(() => {
      jest.clearAllMocks();
  });

  it('should create content with provided data', async () => {
      const mockInput = {
        SectionInput: {
          title: 'Test Title',
          description: 'Test Description',
          contentImage: 'Test Image URL'
        }
      };

      const mockNewContent = {
          id: '321321',
          title:mockInput.SectionInput.title,
          description:mockInput.SectionInput.description,
          contentImage:mockInput.SectionInput.contentImage,
            toObject: jest.fn(),
      };

      (sectionModel.create as jest.Mock).mockResolvedValue(mockNewContent);
      const result = await createSection({}, mockInput);

      expect(sectionModel.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockNewContent.toObject());
  });
  it('should throw an error if content creation fails', async () => {
    const mockInput = {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL'
    };

    const mockError = new Error('cannot find content');

    (sectionModel.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createSection({}, mockInput)).rejects.toThrow(mockError);
});

  it('should throw an unknown error if the error type is not recognized', async () => {
      const mockInput = {
          title: 'Test Title',
          description: 'Test Description',
          contentImage: 'Test Image URL'
      };
      (sectionModel.create as jest.Mock).mockRejectedValue('Unknown error');
      await expect(createSection({}, mockInput)).rejects.toThrow('cannot find content');
  });
})