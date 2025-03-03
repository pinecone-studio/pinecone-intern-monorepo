import { ConcertModel, TicketModel } from '../../../../src/models';
import { updateConcertTicket } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

describe('update concert ticket', () => {
  it('1. concert not found', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);
    (ConcertModel.findById as jest.Mock) = mockFindByIdAndUpdate;
    await expect(
      updateConcertTicket!({}, { input: { concertID: '1', vipTicketQuantity: 1, standartTicketQuantity: 1, standingAreaTicketQuantity: 1, ticketNumber: 11 } }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow(new Error('Концерт байхгүй байна'));
  });

  it('2. concert ticket sold out', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: '6791dbddc2023ad6b79dda56',
      concertName: 'mm',
      concertPlan: 'dv',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',
      concertPhoto: 'fsg',
      vipTicket: { price: 43, quantity: 0 },
      regularTicket: { price: 43, quantity: 0 },
      standingAreaTicket: { price: 43, quantity: 0 },
    });

    (ConcertModel.findById as jest.Mock) = mockFindByIdAndUpdate;

    await expect(
      updateConcertTicket!(
        {},
        { input: { concertID: '6791dbddc2023ad6b79dda56', vipTicketQuantity: 1, standartTicketQuantity: 1, standingAreaTicketQuantity: 1, ticketNumber: 11 } },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow(new Error('tasalbariin too duuussan baina'));
  });

  it('3. concert vip ticket no seat', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: '6791dbddc2023ad6b79dda56',
      concertName: 'mm',
      concertPlan: 'dv',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',
      concertPhoto: 'fsg',
      vipTicket: { price: 43, quantity: 11 },
      regularTicket: { price: 43, quantity: 11 },
      standingAreaTicket: { price: 43, quantity: 11 },
    });

    (ConcertModel.findById as jest.Mock) = mockFindByIdAndUpdate;
    await expect(
      updateConcertTicket!(
        {},
        { input: { concertID: '6791dbddc2023ad6b79dda56', vipTicketQuantity: 12, standartTicketQuantity: 12, standingAreaTicketQuantity: 12, ticketNumber: 11 } },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow(new Error('VIP 12 ширхэг тасалбар захиалах боломжгүй байна, ; Энгийн 12 ширхэг тасалбар захиалах боломжгүй байна,; Fanzone 12 ширхэг тасалбар захиалах боломжгүй байна'));
  });

  it('4. should update concert tickets and create ticket record', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: '6791dbddc2023ad6b79dda56',
      vipTicket: { price: 43, quantity: 10 },
      regularTicket: { price: 43, quantity: 10 },
      standingAreaTicket: { price: 43, quantity: 10 },
      concertName: 'mm',
      concertPlan: 'dv',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',
      concertPhoto: 'fsg',
    });

    (ConcertModel.findById as jest.Mock) = mockFindByIdAndUpdate;

    const mockUpdateResult = jest.fn().mockResolvedValueOnce({
      _id: '6791dbddc2023ad6b79dda56',
      vipTicket: { price: 43, quantity: 9 },
      regularTicket: { price: 43, quantity: 9 },
      standingAreaTicket: { price: 43, quantity: 9 },
      concertName: 'mm',
      concertPlan: 'dv',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',
      concertPhoto: 'fsg',
    });

    (ConcertModel.findByIdAndUpdate as jest.Mock) = mockUpdateResult;

    (TicketModel.create as jest.Mock) = jest.fn().mockResolvedValueOnce({});

    await updateConcertTicket!(
      {},
      {
        input: {
          concertID: '6791dbddc2023ad6b79dda56',
          vipTicketQuantity: 1,
          standartTicketQuantity: 1,
          standingAreaTicketQuantity: 1,
          ticketNumber: 11,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(ConcertModel.findById).toHaveBeenCalledWith({ _id: '6791dbddc2023ad6b79dda56' });

    expect(ConcertModel.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: '6791dbddc2023ad6b79dda56' },
      {
        $inc: {
          'vipTicket.quantity': -1,
          'regularTicket.quantity': -1,
          'standingAreaTicket.quantity': -1,
        },
      },
      { new: true }
    );

    expect(TicketModel.create).toHaveBeenCalledWith({
      concertID: '6791dbddc2023ad6b79dda56',
      vipTicket: 1,
      standartTicket: 1,
      standingAreaTicket: 1,
      ticketNumber: 11,
    });
  });
});
