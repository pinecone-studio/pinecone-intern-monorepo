import { GetAllAdminPostsQuery } from '@/generated';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminGetPostsProps {
  posts: GetAllAdminPostsQuery['getPosts'];
}

export const AdminOwnerPostDa = ({ posts }: AdminGetPostsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<string>('');
  const router = useRouter();

  const handleStatus = (selectedStatus: string) => {
    setStatus(selectedStatus);
  };

  const filteredPosts = posts.filter((item) => {
    const matchesSearchTerm = item.propertyOwnerId.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = status ? item.status?.toUpperCase() === status.toUpperCase() : true;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="container h-[767px] w-screen max-w-[1280px] mx-auto mt-8 p-4">
      <p role="Зарууд" className="font-semibold text-xl">
        Зарууд
      </p>
      <div className="mt-6 flex justify-between items-center">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Утасны дугаараар хайх..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4 bg-[#c7c7c8] py-1 px-2 rounded-md cursor-pointer ">
          <button data-testid="status-filter-pending" onClick={() => handleStatus('PENDING')} className="hover:bg-[#e8e8ea] p-1 rounded-sm transition-all duration-300 ease-in-out">
            Хүсэлт илгээсэн
          </button>
          <button data-testid="status-filter-approved" onClick={() => handleStatus('APPROVED')} className="hover:bg-[#e8e8ea] p-1 rounded-sm transition-all duration-300 ease-in-out">
            Зөвшөөрсөн
          </button>
          <button data-testid="status-filter-decliened" onClick={() => handleStatus('DECLINED')} className="hover:bg-[#e8e8ea] p-1 rounded-sm transition-all duration-300 ease-in-out">
            Татгалзсан
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Нэр</th>
                <th className="px-4 py-2 border">Эзэмшигч</th>
                <th className="px-4 py-2 border">Утасны дугаар</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((item) => (
                  <tr
                    data-testid="post-item"
                    key={item.propertyOwnerId?._id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => router.push(`/admin/real-estates/${item._id}`)}
                  >
                    <td className="px-4 py-2 border">{item.propertyOwnerId?._id.slice(0, 4)}</td>
                    <td className="px-4 py-2 flex items-center border gap-2">
                      <img src={item.propertyDetail?.images?.[0]} width={48} height={58} alt="Property" />
                      <span>{item.title}</span>
                    </td>
                    <td className="px-4 py-2 border">{item.propertyOwnerId?.name}</td>
                    <td className="px-4 py-2 border">{item.propertyOwnerId?.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Хайлтанд тохирох үр дүн олдсонгүй.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
