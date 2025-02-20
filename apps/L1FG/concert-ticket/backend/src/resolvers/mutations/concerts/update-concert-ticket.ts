/*eslint-disable*/
import { MutationResolvers } from '../../../generated';
import { ConcertModel } from '../../../models';
import { TicketModel } from '../../../models/ticket.model';

export const updateConcertTicket: MutationResolvers['updateConcertTicket'] = async (_: unknown, { input }) => {
  const { concertID, vipTicketQuantity, standartTicketQuantity, standingAreaTicketQuantity, ticketNumber } = input;

  const concert = await ConcertModel.findById({ _id: concertID });

  if (!concert) throw new Error('Концерт байхгүй байна');

  if (concert.regularTicket.quantity === 0 && concert.standingAreaTicket.quantity === 0 && concert.vipTicket.quantity === 0) throw new Error('tasalbariin too duuussan baina');

  const errors: string[] = [];

  if (typeof vipTicketQuantity === 'number' && concert.vipTicket.quantity < vipTicketQuantity) {
    errors.push(`VIP ${vipTicketQuantity} ширхэг тасалбар захиалах боломжгүй байна, `);
  }

  if (typeof standartTicketQuantity === 'number' && concert.regularTicket.quantity < standartTicketQuantity) {
    errors.push(`Энгийн ${standartTicketQuantity} ширхэг тасалбар захиалах боломжгүй байна,`);
  }

  if (typeof standingAreaTicketQuantity === 'number' && concert.standingAreaTicket.quantity < standingAreaTicketQuantity) {
    errors.push(`Fanzone ${standingAreaTicketQuantity} ширхэг тасалбар захиалах боломжгүй байна`);
  }

  if (errors.length > 0) {
    throw new Error(errors.join('; '));
  }

  const updateOperations: Record<string, number> = {};

  if (typeof vipTicketQuantity === 'number' && concert.vipTicket.quantity >= vipTicketQuantity) {
    updateOperations['vipTicket.quantity'] = -vipTicketQuantity;
  }

  if (typeof standartTicketQuantity === 'number' && concert.regularTicket.quantity >= standartTicketQuantity) {
    updateOperations['regularTicket.quantity'] = -standartTicketQuantity;
  }

  if (typeof standingAreaTicketQuantity === 'number' && concert.standingAreaTicket.quantity >= standingAreaTicketQuantity) {
    updateOperations['standingAreaTicket.quantity'] = -standingAreaTicketQuantity;
  }

  const updateConcert = await ConcertModel.findByIdAndUpdate({ _id: concertID }, { $inc: updateOperations }, { new: true });

  await TicketModel.create({ concertID, vipTicket: vipTicketQuantity, standartTicket: standartTicketQuantity, standingAreaTicket: standingAreaTicketQuantity, ticketNumber });

  return updateConcert;
};
