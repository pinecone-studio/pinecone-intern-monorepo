'use client';
import TableRow from './_components/TableRow';
import TableHeader from './_components/TableHeader';
import { Request, useGetCancelRequestsQuery } from '@/generated';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

const Page = () => {
  const { data, loading } = useGetCancelRequestsQuery();
  const requests = data?.getCancelRequests?.filter((c): c is Request => c !== null) ?? [];

  return (
    <div className="flex flex-col w-full min-h-screen bg-secondary px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Цуцлах хүсэлтүүд</h2>
          <p className="text-sm text-muted-foreground">Админд ирсэн бүх цуцлах хүсэлтүүд</p>
        </div>
        <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
          <TableHeader />
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px] py-10">
              <LoadingAnimation />
            </div>
          ) : requests.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {requests.map((request) => (
                <TableRow key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">Цуцлах хүсэлт олдсонгүй.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
