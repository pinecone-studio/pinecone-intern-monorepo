import { Request } from '@/generated';
import { format } from 'date-fns';
import CancelButton from './CancelButton';

const TableRow = ({ request }: { request: Request }) => {
  return (
    <div data-testid={`request-${request.id}`} className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-gray-50 text-sm transition">
      <p className="w-full md:w-1/5 font-medium truncate">{request.concert.title}</p>
      <p className="w-full md:w-1/5 truncate">{request.accountNumber}</p>
      <p className="w-full md:w-1/5 truncate">{request.bankName}</p>
      <p className="w-full md:w-1/5 font-medium truncate">{request.bankOwnerName}</p>
      <p className="w-full md:w-1/5 text-right font-semibold">{request.ticket.totalPrice.toLocaleString()}₮</p>
      <p className="w-full md:w-1/5 text-right text-gray-500">{format(new Date(Number(request.createdAt)), 'yyyy-MM-dd HH:mm')}</p>

      <div className="w-full md:w-[120px] flex justify-end mt-2 md:mt-0">
        {request.status === 'PENDING' ? <CancelButton request={request} /> : <span className="inline-block rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">Шилжүүлсэн</span>}
      </div>
    </div>
  );
};

export default TableRow;
