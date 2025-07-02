import { hotelModel } from '../../../src/models';
import { createHotel, deleteHotel, updateHotel } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models', () => ({
  hotelModel: {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    toObject: jest.fn().mockReturnValue({
      id: '123',
      name: 'Mock Hotel',
      location: 'Mock City',
      price: 100,
    }),
  },
}));

describe('Hotel mutations', () => {
  const mockHotelInput = {
    name: 'Test Hotel',
    address: 'Ulaanbaatar',
    phone: '12345678',
  };

  const mockHotel = {
    _id: 'hotel123',
    ...mockHotelInput,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createHotel', () => {
    it('should create a hotel successfully', async () => {
      (hotelModel.create as jest.Mock).mockResolvedValueOnce({
        toObject: () => ({
          _id: 'hotel123',
          ...mockHotelInput,
        }),
      });

      const result = await createHotel(null, { input: mockHotelInput });

      expect(hotelModel.create).toHaveBeenCalledWith(mockHotelInput);
      expect(result).toEqual({
        id: 'hotel123',
        _id: 'hotel123',
        ...mockHotelInput,
      });
    });
    it('should throw error if createHotel fails', async () => {
      (hotelModel.create as jest.Mock).mockRejectedValueOnce(new Error('Create failed'));

      await expect(createHotel(null, { input: mockHotelInput })).rejects.toThrow('Failed to create hotel: Error: Create failed');
    });
  });

  describe('updateHotel', () => {
    it('should update existing hotel', async () => {
      (hotelModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockHotel);

      const result = await updateHotel(null, {
        id: 'hotel123',
        input: mockHotelInput,
      });

      expect(hotelModel.findByIdAndUpdate).toHaveBeenCalledWith('hotel123', mockHotelInput, { new: true, runValidators: true });
      expect(result).toEqual(mockHotel);
    });

    it('should throw error if hotel not found', async () => {
      (hotelModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

      await expect(updateHotel(null, { id: 'invalid-id', input: mockHotelInput })).rejects.toThrow('Hotel not found');
    });
  });

  describe('deleteHotel', () => {
    it('should delete hotel successfully', async () => {
      (hotelModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockHotel);

      const result = await deleteHotel(null, { id: 'hotel123' });

      expect(hotelModel.findByIdAndDelete).toHaveBeenCalledWith('hotel123');
      expect(result).toEqual({
        success: true,
        message: 'Hotel deleted successfully',
      });
    });

    it('should throw error if hotel not found', async () => {
      (hotelModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

      await expect(deleteHotel(null, { id: 'nonexistent' })).rejects.toThrow('Hotel not found');
    });
  });
});
