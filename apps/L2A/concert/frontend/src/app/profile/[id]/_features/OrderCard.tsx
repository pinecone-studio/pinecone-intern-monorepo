'use client';
import { Ticket } from '@/generated';
import CancelRequestDialog from './CancelRequestDialog';

const formatDate = (timestamp: string) => new Date(Number(timestamp)).toLocaleString('mn-MN', { dateStyle: 'medium', timeStyle: 'short' });
const formatPrice = (value: number) => value.toLocaleString() + '₮';

const OrderCard = ({ ticket, userId, index }: { ticket: Ticket; userId: string; index: number }) => {
  return (
    <div key={ticket.id} className="bg-[#2c2c2e] rounded-lg p-4 shadow-lg space-y-4" data-cy={`ticket-${ticket.id}`}>
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{ticket.concert.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-3">{ticket.concert.description}</p>
          <p className="text-xs text-gray-400 mt-2">
            Нээлт: {ticket.concert.doorOpen} | Эхлэх: {ticket.concert.musicStart}
          </p>
          <p className="text-xs text-gray-400">Захиалсан: {formatDate(ticket.createdAt)}</p>
        </div>
      </div>
      <div className="bg-[#3a3a3c] p-3 rounded space-y-2">
        {Object.entries(ticket.ticket)
          .filter(([type]) => type !== '__typename')
          .map(([type, detail]: any) => (
            <div key={type} className="flex justify-between text-sm" data-cy={`ticket-type-${type}`}>
              <span className="text-white font-medium">{type}</span>
              <span className="text-gray-300">
                {detail.price.toLocaleString()}₮ × {detail.count} = {(detail.price * detail.count).toLocaleString()}₮
              </span>
            </div>
          ))}
      </div>
      <CancelRequestDialog ticketId={ticket.id} userId={userId} index={index} />
      <div className="text-right font-bold text-lg text-green-400" data-cy="ticket-total">
        Нийт: {formatPrice(ticket.totalPrice)}
      </div>
    </div>
  );
};

export default OrderCard;
