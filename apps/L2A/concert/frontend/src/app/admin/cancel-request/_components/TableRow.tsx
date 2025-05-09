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
      <p className="p-4 grid justify-end">{request.status}</p>
    </div>
  );
};

export default TableRow;
