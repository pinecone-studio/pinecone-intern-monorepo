import { createPost } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations';
import { POST_MODEL } from 'apps/L2A/real-estate/real-estate-backend/src/models/post';
import { PropertyType } from 'apps/L2A/real-estate/real-estate-backend/src/generated';

describe('createPost', () => {
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

    const mockCreate = jest.fn().mockResolvedValue({
      _id: 'generatedPostId123',
      ...input,
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
      lift: undefined,
      location: undefined,
    });
    POST_MODEL.create = mockCreate;

    const result = await createPost(null, { input });
    expect(POST_MODEL.create).toHaveBeenCalledTimes(1);
    expect(POST_MODEL.create).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result).toHaveProperty('_id');
    expect(result.title).toBe(input.title);
    expect(result.status).toBe('pending');
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(result.lift).toBeUndefined();
    expect(result.location).toBeUndefined();
  });

  it('should handle errors when creation fails', async () => {
    const input = {
      title: 'Test Error Post',
      description: 'Description for post',
      price: 100000,
      propertyOwnerId: 'userId123',
    };

    const mockCreate = jest.fn().mockRejectedValue(new Error('Database error'));

    POST_MODEL.create = mockCreate;

    await expect(createPost(null, { input })).rejects.toThrow('Database error');

    expect(POST_MODEL.create).toHaveBeenCalledTimes(1);
  });
});















