'use client';
import { headers } from './utils/Table';
import { useGetRequestsQuery } from '../../../generated';
import Status from '../_components/Status';
import { useRouter } from 'next/navigation';

const Requests = () => {
  const router = useRouter();
  const { data, loading } = useGetRequestsQuery();
  const currentDate = new Date().toLocaleDateString();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <div className="flex flex-col gap-6 w-[1154px] p-6 bg-white rounded-sm">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Чөлөө</h1>
          <p>{currentDate}</p>
        </div>
        <div className="flex gap-4">
          <button>Хүсэлт</button>
          <button>Ажилчид</button>
          <button>Түүх</button>
        </div>
        <div className="flex flex-col gap-6 bg-gray-100 w-full">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <div className="w-full max-h-[480px] overflow-y-auto bg-white">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-base-300">
                    {headers.map((header, index) => (
                      <th key={index} scope="col" className="px-6 py-3">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.getRequests.map((dat, index) => (
                    <tr key={index} className="cursor-pointer" onClick={() => router.push(`/leaving/Detail/?requestId=${dat._id}`)} data-testid="requests">
                      <td className="px-6 py-4 text-[#3F4145] text-sm">{dat._id}</td>
                      <td className="px-6 py-4 text-[#3F4145] text-sm">{dat.declinedReasoning}</td>
                      <td className="px-6 py-4 text-[#3F4145] text-sm">{dat.description}</td>
                      <td className="px-6 py-4 text-[#3F4145] text-sm">{dat.totalHour}</td>
                      <td className="px-6 py-4 text-[#3F4145] text-sm">{dat.totalHour}</td>
                      <td className="px-6 py-4" data-testid="request-status">
                        <Status dat={dat} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Requests;
