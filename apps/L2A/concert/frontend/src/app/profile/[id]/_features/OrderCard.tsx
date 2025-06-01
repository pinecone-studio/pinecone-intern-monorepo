import { useAuth } from '@/app/_components/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Ticket, useCreateCancelRequestMutation } from '@/generated';
import { Snackbar } from '@mui/material';

const formatDate = (timestamp: string) => new Date(Number(timestamp)).toLocaleString('mn-MN', { dateStyle: 'medium', timeStyle: 'short' });
const formatPrice = (value: number) => value.toLocaleString() + '₮';

const OrderCard = ({ ticket }: { ticket: Ticket }) => {
  const { user } = useAuth();
  const [createCancelRequest, { loading, error }] = useCreateCancelRequestMutation();

  const handleCancelRequst = async (ticketId: string) => {
    await createCancelRequest({ variables: { ticketId, userId: user?.id as string }, refetchQueries: ['userTickets'] });
  };
  return (
    <div key={ticket.id} className="bg-[#2c2c2e] rounded-lg p-4 shadow-lg space-y-4" data-cy={`ticket-${ticket.id}`}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү!" />
      <Snackbar autoHideDuration={500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} message={error?.message} />
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
      <Button data-testid="cancel-request-button" disabled={loading} onClick={() => handleCancelRequst(ticket.id)}>
        Тасалбар буцаах
      </Button>
      <div className="text-right font-bold text-lg text-green-400" data-cy="ticket-total">
        Нийт: {formatPrice(ticket.totalPrice)}
      </div>
    </div>
  );
};

export default OrderCard;
