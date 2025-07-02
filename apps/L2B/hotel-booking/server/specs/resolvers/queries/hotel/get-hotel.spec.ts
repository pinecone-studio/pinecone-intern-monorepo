import { hotelModel } from 'apps/L2B/hotel-booking/server/src/models';
import { hotel } from 'apps/L2B/hotel-booking/server/src/resolvers/queries';

jest.mock('apps/L2B/hotel-booking/server/src/models', () => ({
  hotelModel: {
    findById: jest.fn(),
  },
}));

describe('Get hotel query ', () => {
  it('ID оруулаагүй үед алдаа гаргах ёстой', async () => {
    await expect(hotel({}, { id: '' })).rejects.toThrow('Hotel ID is required.');
  });

  it('Буруу ID оруулсан үед алдаа гаргах ёстой', async () => {
    (hotelModel.findById as jest.Mock).mockResolvedValueOnce(null);

    await expect(hotel({}, { id: 'wrong-id' })).rejects.toThrow('Hotel not found');

    expect(hotelModel.findById).toHaveBeenCalledWith('wrong-id');
  });

  it('Зөв ID оруулсан үед зочид буудлыг буцаах ёстой', async () => {
    const mockHotel = {
      _id: '507f1f77bcf86cd799439011',
      name: 'Grand Hotel',
      address: '123 Main St',
    };

    (hotelModel.findById as jest.Mock).mockResolvedValueOnce(mockHotel);

    const result = await hotel({}, { id: '507f1f77bcf86cd799439011' });

    expect(result).toEqual(mockHotel);

    expect(hotelModel.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  });

  it('Database алдаа гарсан үед алдаа буцаах ёстой', async () => {
    (hotelModel.findById as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    await expect(hotel({}, { id: 'valid-id' })).rejects.toThrow('Database error');
  });
});
