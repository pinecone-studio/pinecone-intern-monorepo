import { addProperty } from '../../../src/resolvers/mutations';
import { HouseTypeEnum, PropertyInput } from '../../../src/generated';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models', () => ({
  PropertyFeatureModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        houseType: 'House',
        size: '30',
        createdAt: 1999,
        details: {
          floorMaterial: '155',
          completionDate: null,
          balcony: true,
          floorNumber: 2,
          lift: true,
          totalFloors: 2,
          windowType: 'MOD',
          windowsCount: 4,
        },
        garage: true,
        images: [],
        location: {
          address: '2q3rawtesy',
          city: 'asdfasdf',
          district: 'asdf',
        },
        restrooms: 1,
        totalRooms: 3,
        uploadedAt: null,
      })
      .mockResolvedValueOnce('Invalid house type'),
  },
}));

describe('addProperty Mutation', () => {
  it('1. should add a property successfully', async () => {
    const mockInput: PropertyInput = {
      houseType: HouseTypeEnum.House,
      size: '30',
      images: [],
      totalRooms: 3,
      garage: true,
      restrooms: 1,
      location: {
        address: '2q3rawtesy',
        city: 'asdfasdf',
        district: 'asdf',
        subDistrict: 'asdf',
      },
      details: {
        completionDate: null,
        windowsCount: 4,
        windowType: 'MOD',
        floorMaterial: '155',
        floorNumber: 2,
        balcony: true,
        totalFloors: 2,
        lift: true,
      },
      uploadedAt: null,
      createdAt: new Date(1999).toISOString(),
    };

    const result = await addProperty!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      houseType: 'House',
      size: '30',
      createdAt: 1999,
      details: {
        floorMaterial: '155',
        completionDate: null,
        balcony: true,
        floorNumber: 2,
        lift: true,
        totalFloors: 2,
        windowType: 'MOD',
        windowsCount: 4,
      },
      garage: true,
      images: [],
      location: {
        address: '2q3rawtesy',
        city: 'asdfasdf',
        district: 'asdf',
      },
      restrooms: 1,
      totalRooms: 3,
      uploadedAt: null,
    });
  });

  it('2. should throw an error if the houseType is invalid', async () => {
    const mockInput: PropertyInput = {
      houseType: HouseTypeEnum.House,
      size: '30',
      images: [],
      totalRooms: 3,
      garage: true,
      restrooms: 1,
      location: {
        address: '2q3rawtesy',
        city: 'asdfasdf',
        district: 'asdf',
        subDistrict: 'asdf',
      },
      details: {
        completionDate: null,
        windowsCount: 4,
        windowType: 'MOD',
        floorMaterial: '155',
        floorNumber: 2,
        balcony: true,
        totalFloors: 2,
        lift: true,
      },
      uploadedAt: null,
      createdAt: new Date(1999).toISOString(),
    };

    try {
      await addProperty!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual('Invalid house type');
    }
  });
});
