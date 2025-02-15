import { GraphQLResolveInfo } from 'graphql';
import { editRoomImages } from 'apps/L1FG/hotel-booking/backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const { RoomModel } = jest.requireMock('../../../../src/models');

describe('Edit Room Images', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return null because hotel is not found', async () => {
    RoomModel.findById.mockResolvedValueOnce(null);

    const mockInput = {
      id: '678cb7f6a4e7125effcba04c',
    };

    if (!editRoomImages) {
      throw new Error('editRoomImages is not defined');
    }

    const response = await editRoomImages({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('Should return updated room', async () => {
    const mockInput = {
      id: '678fa6e4bc144b03f808a5e7',
      images: ['try1.jpg'],
    };

    const mockRoom = {
      id: '678fa6e4bc144b03f808a5e7',
      images: ['try1.jpg'],
    };
    RoomModel.findById.mockResolvedValueOnce(mockRoom);
    RoomModel.findByIdAndUpdate.mockResolvedValueOnce(mockRoom);

    if (!editRoomImages) {
      throw new Error('editRoomImages is not defined');
    }

    const response = await editRoomImages({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockRoom);
  });
});
