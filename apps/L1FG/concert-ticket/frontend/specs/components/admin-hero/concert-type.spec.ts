import { convertToEditFormData, Concert } from '@/components/adminfeature/concert-type';

describe('convertToEditFormData', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-02-21'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('converts a complete concert data correctly', () => {
    const concert: Concert = {
      _id: '1',
      concertName: 'Test Concert',
      concertPlan: 'Test Plan',
      artistName: ['Artist 1', null, 'Artist 2'],
      concertDay: '2024-03-15',
      concertTime: '19:00',
      concertPhoto: 'photo.jpg',
      vipTicket: {
        quantity: 100,
        price: 50000,
      },
      regularTicket: {
        quantity: 200,
        price: 30000,
      },
      standingAreaTicket: {
        quantity: 300,
        price: 20000,
      },
    };

    const result = convertToEditFormData(concert);

    expect(result).toEqual({
      concertName: 'Test Concert',
      concertPlan: 'Test Plan',
      artistName: ['Artist 1', null, 'Artist 2'],
      concertDay: new Date('2024-03-15'),
      concertTime: '19:00',
      vipTicket: {
        quantity: 100,
        price: 50000,
      },
      regularTicket: {
        quantity: 200,
        price: 30000,
      },
      standingAreaTicket: {
        quantity: 300,
        price: 20000,
      },
    });
  });

  it('handles missing concert date', () => {
    const concert: Concert = {
      _id: '1',
      concertName: 'Test Concert',
      concertPlan: 'Test Plan',
      artistName: ['Artist 1'],
      concertTime: '19:00',
      concertPhoto: 'photo.jpg',
    };

    const result = convertToEditFormData(concert);

    expect(result.concertDay).toEqual(new Date('2024-02-21'));
  });

  it('handles null tickets', () => {
    const concert: Concert = {
      _id: '1',
      concertName: 'Test Concert',
      concertPlan: 'Test Plan',
      artistName: ['Artist 1'],
      concertDay: '2024-03-15',
      concertTime: '19:00',
      concertPhoto: 'photo.jpg',
      vipTicket: null,
      regularTicket: null,
      standingAreaTicket: null,
    };

    const result = convertToEditFormData(concert);

    expect(result.vipTicket).toEqual({ quantity: 0, price: 0 });
    expect(result.regularTicket).toEqual({ quantity: 0, price: 0 });
    expect(result.standingAreaTicket).toEqual({ quantity: 0, price: 0 });
  });

  it('handles partial ticket data', () => {
    const concert: Concert = {
      _id: '1',
      concertName: 'Test Concert',
      concertPlan: 'Test Plan',
      artistName: ['Artist 1'],
      concertDay: '2024-03-15',
      concertTime: '19:00',
      concertPhoto: 'photo.jpg',
      vipTicket: { quantity: 100, price: null },
      regularTicket: { quantity: null, price: 30000 },
      standingAreaTicket: { quantity: 300, price: 20000 },
    };

    const result = convertToEditFormData(concert);

    expect(result.vipTicket).toEqual({ quantity: 100, price: 0 });
    expect(result.regularTicket).toEqual({ quantity: 0, price: 30000 });
    expect(result.standingAreaTicket).toEqual({ quantity: 300, price: 20000 });
  });
});
