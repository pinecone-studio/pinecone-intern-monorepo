import { Button } from '@/components/ui/button';
import { Request } from '@/generated';
import { format } from 'date-fns';

const TableRow = ({ request }: { request: Request }) => {
  return (
    <div data-testid={`request-${request.id}`} className="grid grid-cols-6 whitespace-nowrap text-black text-base border-b border-b-1 p-3">
      <p className="p-4 font-medium truncate">{request.concert.title}</p>
      <p className="p-4 font-normal overflow-scroll">dansnii dugaar</p>
      <p className="p-4 font-medium">{request.user.email}</p>
      <p className="p-4 grid justify-end font-medium">{request.ticket.totalPrice}</p>
      <p className="p-4 grid justify-end font-normal">{format(new Date(Number(request.createdAt)), 'yyyy-mm-dd hh-mm-ss')}</p>
      <div className="w-full px-3 py-3 flex justify-end">
        {request.status === 'PENDING' ? (
          <Button className="rounded-md border" variant={'outline'}>
            Duusgah
          </Button>
        ) : (
          <p className="bg-secondary rounded-full px-[10px] flex items-center text-xs">shiljuulsen</p>
        )}
      </div>
    </div>
  );
};

export default TableRow;
