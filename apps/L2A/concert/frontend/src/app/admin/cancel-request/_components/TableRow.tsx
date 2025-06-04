import { Button } from '@/components/ui/button';
import { Request } from '@/generated';
import { format } from 'date-fns';

const TableRow = ({ request }: { request: Request }) => {
  return (
    <div data-testid={`request-${request.id}`} className="grid grid-cols-6 text-black text-sm border-b border-gray-200 px-4 py-2 items-center hover:bg-gray-50 transition-colors">
      <p className="truncate font-medium">{request.concert.title}</p>
      <p className="">{request.accountNumber}</p>
      <p className="font-medium">{request.bankOwnerName}</p>
      <p className="text-right font-medium">{request.ticket.totalPrice}</p>
      <p className="text-right">{format(new Date(Number(request.createdAt)), 'yyyy-MM-dd HH:mm:ss')}</p>
      <div className="flex justify-end">
        {request.status === 'PENDING' ? (
          <Button className="rounded-md" variant="outline" size="sm">
            Дуусгах
          </Button>
        ) : (
          <p className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">Шилжүүлсэн</p>
        )}
      </div>
    </div>
  );
};

export default TableRow;
