import { GraphQLResolveInfo } from 'graphql';
import { editRoomServices } from 'apps/L1FG/hotel-booking/backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const { RoomModel } = jest.requireMock('../../../../src/models');

describe('Edit Room Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return null because hotel is not found', async () => {
    RoomModel.findById.mockResolvedValueOnce(null);

    const mockInput = {
      id: '678cb7f6a4e7125effcba04c',
    };

    const response = await editRoomServices!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('Should return updated room', async () => {
    const mockInput = {
      id: '678fa6e4bc144b03f808a5e7',
      roomServices: [
        {
          key: 'Parking',
          value: 'Not Available',
        },
      ],
    };

    const mockRoom = {
      id: '678fa6e4bc144b03f808a5e7',
      roomServices: [
        {
          key: 'Parking',
          value: 'Not Available',
        },
      ],
    };
    RoomModel.findById.mockResolvedValueOnce(mockRoom);
    RoomModel.findByIdAndUpdate.mockResolvedValueOnce(mockRoom);

    const response = await editRoomServices!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockRoom);
  });
});
