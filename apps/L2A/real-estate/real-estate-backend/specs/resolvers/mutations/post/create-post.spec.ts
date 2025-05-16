import { createPost } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations';
import { POST_MODEL } from 'apps/L2A/real-estate/real-estate-backend/src/models/post';
import { PropertyType } from 'apps/L2A/real-estate/real-estate-backend/src/generated';

jest.mock('apps/L2A/real-estate/real-estate-backend/src/models/post', () => ({
  POST_MODEL: {
    create: jest.fn()
  }
}));

describe('createPost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a post successfully', async () => {
    const input = {
      balcony: true,
      completionDate: '2025-01-01',
      description: 'A lovely house with a big garden',
      floorNumber: 2,
      garage: true,
      images: ['image1.jpg', 'image2.jpg'],
      price: 350000,
      propertyOwnerId: 'userId123',
      restrooms: 2,
      roofMaterial: 'tile',
      size: 120.5,
      status: 'pending',
      title: 'Beautiful House',
      totalFloors: 5,
      totalRooms: 3,
      type: 'house' as PropertyType,
      windowType: 'double-glazed',
      windowsCount: 10,
    };

    const mockResult = {
      _id: 'generatedPostId123',
      ...input,
      status: 'PENDING', 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (POST_MODEL.create as jest.Mock).mockResolvedValue(mockResult);

    const result = await createPost(null, { input });
    
    expect(POST_MODEL.create).toHaveBeenCalledTimes(1);
    expect(POST_MODEL.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...input,
        status: expect.stringMatching(/pending/i) 
      })
    );
    
    expect(result).toMatchObject({
      ...input,
      _id: 'generatedPostId123',
      status: expect.stringMatching(/pending/i), 
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('should handle errors when creation fails', async () => {
    const input = {
      title: 'Test Error Post',
      description: 'Description for post',
      price: 100000,
      propertyOwnerId: 'userId123',
    };

    (POST_MODEL.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createPost(null, { input })).rejects.toThrow('Database error');
    expect(POST_MODEL.create).toHaveBeenCalledTimes(1);
  });
});