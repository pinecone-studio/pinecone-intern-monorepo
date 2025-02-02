import { addPost } from 'apps/L1FG/real-state/backend/src/resolvers/mutations/post';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/real-state/backend/src/models/post-model', () => {
  // eslint-disable-next-line
  const { HouseTypeEnum, PostStats } = require('apps/L1FG/real-state/backend/src/generated');
  return {
    Post: {
      create: jest
        .fn()
        .mockResolvedValueOnce({
          id: '1',
          title: 'title',
          description: 'description',
          price: '1000',
          status: PostStats.Pending,
          updatedAt: '',
          propertyOwnerId: '1',
          propertyDetail: {
            houseType: HouseTypeEnum.Apartment,
            garage: false,
            images: ['qwe'],
            totalRooms: 3,
            restrooms: 2,
            size: 100,
            location: {
              address: 'address',
              city: 'city',
              district: 'country',
              subDistrict: 'subDistrict',
            },
            details: {
              balcony: true,
              completionDate: '2022-12-12',
              floorMaterial: 'floorMaterial',
              floorNumber: 3,
              lift: true,
              totalFloors: 5,
              windowType: 'windowType',
              windowsCount: 3,
            },
            createdAt: '',
            updatedAt: '',
          },
          createdAt: '',
        })
        .mockRejectedValueOnce(new Error('Post validation failed')),
    },
  };
});

//eslint-disable-next-line
const { HouseTypeEnum, PostStats } = require('apps/L1FG/real-state/backend/src/generated');

const mockInput = {
  title: 'title',
  description: 'description',
  price: '1000',
  status: PostStats.Pending,
  propertyOwnerId: '1',
  propertyDetail: {
    houseType: HouseTypeEnum.Apartment,
    garage: false,
    images: ['qwe'],
    totalRooms: 3,
    restrooms: 2,
    size: '100',
    location: {
      address: 'address',
      city: 'city',
      district: 'country',
      subDistrict: 'subDistrict',
    },
    details: {
      balcony: true,
      completionDate: '2022-12-12',
      floorMaterial: 'floorMaterial',
      floorNumber: 3,
      lift: true,
      totalFloors: 5,
      windowType: 'windowType',
      windowsCount: 3,
    },
  },
};
describe('addPost', () => {
  it('1. should create a post', async () => {
    const response = await addPost!({}, { input: mockInput }, { userId: '1' }, {} as GraphQLResolveInfo);
    expect(response).toEqual({
      id: '1',
      title: 'title',
      description: 'description',
      price: '1000',
      status: PostStats.Pending,
      updatedAt: '',
      propertyOwnerId: '1',
      propertyDetail: {
        houseType: HouseTypeEnum.Apartment,
        garage: false,
        images: ['qwe'],
        totalRooms: 3,
        restrooms: 2,
        size: 100,
        location: {
          address: 'address',
          city: 'city',
          district: 'country',
          subDistrict: 'subDistrict',
        },
        details: {
          balcony: true,
          completionDate: '2022-12-12',
          floorMaterial: 'floorMaterial',
          floorNumber: 3,
          lift: true,
          totalFloors: 5,
          windowType: 'windowType',
          windowsCount: 3,
        },
        createdAt: '',
        updatedAt: '',
      },
      createdAt: '',
    });
  });

  it('2. should throw an error', async () => {
    try {
      await addPost!({}, { input: mockInput }, { userId: '1' }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Post validation failed'));
    }
  });
});
