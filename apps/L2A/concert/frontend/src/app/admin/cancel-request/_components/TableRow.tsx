import { Button } from '@/components/ui/button';

export type Request = {
  id: string;
  concertName: string;
  bankInfo: string;
  owner: string;
  amount: string;
  date: string;
  status: string;
};

const TableRow = ({ request }: { request: Request }) => {
  return (
    <div data-testid={`request-${request.id}`} className="grid grid-cols-6 whitespace-nowrap text-black text-base border-b border-b-1 p-3">
      <p className="p-4 font-medium">{request.concertName}</p>
      <p className="p-4 font-normal overflow-scroll">{request.bankInfo}</p>
      <p className="p-4 font-medium">{request.owner}</p>
      <p className="p-4 grid justify-end font-medium">{request.amount}</p>
      <p className="p-4 grid justify-end font-normal">{request.date}</p>
      <div className="w-full px-3 py-3 flex justify-end">
        {request.status === 'дуусгах' ? (
          <Button className="rounded-md border" variant={'outline'}>
            {request.status}
          </Button>
        ) : (
          <p className="bg-secondary rounded-full px-[10px] flex items-center text-xs">{request.status}</p>
        )}
      </div>
    </div>
  );
};

export default TableRow;
