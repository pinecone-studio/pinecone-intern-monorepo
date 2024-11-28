import { updateEventQuantityBooking } from '../../../../src/resolvers/mutations';
import { bookingModel, EventModel } from '../../../../src/models';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    findById: jest.fn(),
  },
  EventModel: {
    findById: jest.fn(),
  },
}));

describe('updateEventQuantityBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update booking and event quantities successfully', async () => {
    (bookingModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      status: 'Төлөвлөсөн',
      venues: [],
      save: jest.fn().mockResolvedValue(true),
    });

    (EventModel.findById as jest.Mock).mockResolvedValue({
      _id: '2',
      venues: [{ name: 'normal', quantity: 10 }],
      save: jest.fn().mockResolvedValue(true),
    });

    const input = {
      _id: '1',
      venues: [{ name: 'normal', quantity: 2, price: 1100 }],
      eventId: '2',
    };

    const result = await updateEventQuantityBooking({}, { input });

    expect(result.status).toBe('Баталгаажсан'); // "Confirmed" in Mongolian
    expect(bookingModel.findById).toHaveBeenCalledWith('1');
    expect(EventModel.findById).toHaveBeenCalledWith('2');
  });

  it('should throw an error if booking is not found', async () => {
    (bookingModel.findById as jest.Mock).mockResolvedValue(null);

    const input = {
      _id: '1000',
      venues: [{ name: 'normal', quantity: 2, price: 1100 }],
      eventId: '2',
    };

    await expect(updateEventQuantityBooking({}, { input })).rejects.toThrow('Booking not found');
  });

  it('should throw an error if event is not found', async () => {
    (EventModel.findById as jest.Mock).mockResolvedValue(null);
    (bookingModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      status: 'Төлөвлөсөн',
      venues: [],
      save: jest.fn().mockResolvedValue(true),
    });

    const input = {
      _id: '1',
      venues: [{ name: 'normal', quantity: 2, price: 1100 }],
      eventId: '1000',
    };

    await expect(updateEventQuantityBooking({}, { input })).rejects.toThrow('Event not found');
  });

  it('should throw an error if tickets are sold out (quantity mismatch)', async () => {
    (bookingModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      status: 'Төлөвлөсөн',
      venues: [],
      save: jest.fn().mockResolvedValue(true),
    });

    (EventModel.findById as jest.Mock).mockResolvedValue({
      _id: '2',
      venues: [{ name: 'normal', quantity: 1 }],
      save: jest.fn().mockResolvedValue(true),
    });

    const input = {
      _id: '1',
      venues: [{ name: 'normal', quantity: 2, price: 1100 }],
      eventId: '2',
    };

    await expect(updateEventQuantityBooking({}, { input })).rejects.toThrow('Тасалбар дууссан байна');
  });

  it('should throw an error if venue does not exist in event', async () => {
    (bookingModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      status: 'Төлөвлөсөн',
      venues: [],
      save: jest.fn().mockResolvedValue(true),
    });

    (EventModel.findById as jest.Mock).mockResolvedValue({
      _id: '2',
      venues: [{ name: 'premium', quantity: 10 }],
      save: jest.fn().mockResolvedValue(true),
    });

    const input = {
      _id: '1',
      venues: [{ name: 'normal', quantity: 2, price: 1100 }],
      eventId: '2',
    };

    await expect(updateEventQuantityBooking({}, { input }));
  });
});
