import { GraphQLResolveInfo } from 'graphql';
import { editRoomGeneralInfo } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const { RoomModel } = jest.requireMock('../../../../src/models');

describe('Edit Room General Info', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return null because hotel is not found', async () => {
    RoomModel.findById.mockResolvedValueOnce(null);

    const mockInput = {
      id: '678cb7f6a4e7125effcba04c',
    };

    const response = await editRoomGeneralInfo!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('Should return updated room', async () => {
    const mockInput = {
      id: '678fa6e4bc144b03f808a5e7',
      name: 'Economy Single Room',
      price: 150000,
      roomInfo: ['18m2', 'Private bathroom'],
      type: 'Single',
      bed: 1,
      roomNumber: 102,
    };

    const mockRoom = {
      id: '678fa6e4bc144b03f808a5e7',
      name: 'Economy Single Room',
      price: 150000,
      roomInfo: ['18m2', 'Private bathroom'],
      type: 'Single',
      bed: 1,
      roomNumber: 102,
    };
    RoomModel.findById.mockResolvedValueOnce(mockRoom);
    RoomModel.findByIdAndUpdate.mockResolvedValueOnce(mockRoom);

    const response = await editRoomGeneralInfo!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockRoom);
  });
});
