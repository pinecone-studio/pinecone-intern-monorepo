import { GraphQLResolveInfo } from 'graphql';
import { getPostById } from '../../../../src/resolvers/queries';
import { Post } from '../../../../src/models/post-model';

jest.mock('apps/L1FG/real-state/backend/src/models/post-model', () => ({
  Post: {
    findById: jest.fn((_id: string) => ({
      populate: jest.fn().mockResolvedValue(
        _id === '6790e86f61598146e7fd83dd'
          ? [
              {
                _id: '679e48e83536883b356d2765',
                propertyOwnerId: '6790e86f61598146e7fd83dd',
                title: 'Beautiful Apartment',
                description: 'A beautiful apartment located in the heart of the city.',
                price: 300000,
                propertyDetail: {
                  houseType: 'Apartment',
                  size: '120',
                  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
                  totalRooms: 4,
                  garage: true,
                  restrooms: 2,
                  location: {
                    address: '123 Main St',
                    city: 'Ulaanbaatar',
                    district: 'Sukhbaatar',
                    subDistrict: '1st Khoroo',
                  },
                  details: {
                    completionDate: '2024-12-31T00:00:00.000Z',
                    windowsCount: 6,
                    windowType: 'Double Glazed',
                    floorMaterial: 'Wood',
                    floorNumber: 5,
                    balcony: true,
                    totalFloors: 10,
                    lift: true,
                  },
                },
                status: 'PENDING',
                updatedAt: new Date('2025-02-05T06:48:00.000Z').toISOString(),
                createdAt: new Date('2025-02-05T06:48:00.000Z').toISOString(),
              },
              {
                _id: '679e49b73536883b356d2767',
                propertyOwnerId: '6790e86f61598146e7fd83dd',
                title: 'Beautiful Apartment',
                description: 'A beautiful apartment located in the heart of the city.',
                price: '12',
                propertyDetail: {
                  houseType: 'Apartment',
                  size: '120',
                  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
                  totalRooms: 4,
                  garage: true,
                  restrooms: 2,
                  location: {
                    address: '123 Main St',
                    city: 'Ulaanbaatar',
                    district: 'Sukhbaatar',
                    subDistrict: '1st Khoroo',
                  },
                  details: {
                    completionDate: '2024-12-31T00:00:00.000Z',
                    windowsCount: 6,
                    windowType: 'Double Glazed',
                    floorMaterial: 'Wood',
                    floorNumber: 5,
                    balcony: true,
                    totalFloors: 10,
                    lift: true,
                  },
                },
                status: 'PENDING',
                updatedAt: new Date('2025-02-05T06:48:00.000Z').toISOString(),
                createdAt: new Date('2025-02-05T06:48:00.000Z').toISOString(),
              },
            ]
          : null
      ),
    })),
  },
}));

describe('getPostById', () => {
  const context = {
    userId: '6790e86f61598146e7fd83dd',
  };

  it('1. should get post by id', async () => {
    const response = await getPostById!({}, { _id: '6790e86f61598146e7fd83dd' }, context, {} as GraphQLResolveInfo);

    expect(Post.findById).toHaveBeenCalledWith('6790e86f61598146e7fd83dd');
    expect(response).toEqual([
      {
        _id: '679e48e83536883b356d2765',
        propertyOwnerId: '6790e86f61598146e7fd83dd',
        title: 'Beautiful Apartment',
        description: 'A beautiful apartment located in the heart of the city.',
        price: 300000,
        propertyDetail: expect.any(Object),
        status: 'PENDING',
        updatedAt: new Date('Wed Feb 05 2025 14:48:00 GMT+0800 (Ulaanbaatar Standard Time)').toISOString(),
        createdAt: new Date('Wed Feb 05 2025 14:48:00 GMT+0800 (Ulaanbaatar Standard Time)').toISOString(),
      },
      {
        _id: '679e49b73536883b356d2767',
        propertyOwnerId: '6790e86f61598146e7fd83dd',
        title: 'Beautiful Apartment',
        description: 'A beautiful apartment located in the heart of the city.',
        price: '12',
        propertyDetail: expect.any(Object),
        status: 'PENDING',
        updatedAt: new Date('Wed Feb 05 2025 14:48:00 GMT+0800 (Ulaanbaatar Standard Time)').toISOString(),
        createdAt: new Date('Wed Feb 05 2025 14:48:00 GMT+0800 (Ulaanbaatar Standard Time)').toISOString(),
      },
    ]);
  });

  it('2. should throw an error if post is not found', async () => {
    try {
      await getPostById!({}, { _id: 'invalid-id' }, context, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(Post.findById).toHaveBeenCalledWith('invalid-id');
      expect(error).toEqual(new Error('There is no post with this ID'));
    }
  });
});
