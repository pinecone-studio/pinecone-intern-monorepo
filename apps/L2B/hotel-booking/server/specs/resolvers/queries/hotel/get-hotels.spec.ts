import { hotelModel } from 'apps/L2B/hotel-booking/server/src/models';
import { hotels } from 'apps/L2B/hotel-booking/server/src/resolvers/queries';

jest.mock('apps/L2B/hotel-booking/server/src/models', () => ({
  hotelModel: {
    find: jest.fn(),
  },
}));

describe('Get all hotels query', () => {
  it('Зочид буудлуудын жагсаалтыг буцаах ёстой', async () => {
    const mockHotels = [
      { _id: '1', name: 'Grand Hotel', address: '123 Main St' },
      { _id: '2', name: 'City Inn', address: '456 Central Ave' },
    ];

    (hotelModel.find as jest.Mock).mockResolvedValueOnce(mockHotels);

    const result = await hotels();

    expect(result).toEqual(mockHotels);
    expect(hotelModel.find).toHaveBeenCalled();
  });

  it('Database алдаа гарсан үед алдаа шидэх ёстой', async () => {
    (hotelModel.find as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    await expect(hotels()).rejects.toThrow('Database error');
    expect(hotelModel.find).toHaveBeenCalled();
  });
});
