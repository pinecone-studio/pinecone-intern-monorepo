'use client';
import TableRow from './_components/TableRow';
import TableHeader from './_components/TableHeader';
import { Request, useGetCancelRequestsQuery } from '@/generated';

const Page = () => {
  const { data } = useGetCancelRequestsQuery();
  console.log(data);
  const requests = data?.getCancelRequests?.filter((c): c is Request => c !== null) ?? [];
  return (
    <div className="flex flex-col w-full h-screen bg-secondary">
      <div className="flex flex-col items-center w-full h-full p-10">
        <div className="w-10/12 flex flex-col p-5">
          <div>
            <h2 className="font-medium text-lg">Хүсэлтүүд</h2>
            <p className="text-muted-foreground text-sm">Ирсэн цуцлах хүсэлтүүд</p>
          </div>
          <div className="my-6 border-b border-[#E4E4E7]" />
          <div className="bg-white rounded-md border border-[#E4E4E7]">
            <TableHeader />
            {requests.length > 0 ? requests.map((request) => <TableRow key={request.id} request={request} />) : <div>Хүсэлт одоогоор алга!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
