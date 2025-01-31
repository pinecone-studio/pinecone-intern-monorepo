import { HouseIcon } from '../layout/icons/HouseIcon';

const data = [
  {
    id: '0001',
    name: 'Seoul royal county хотхон',
    owner: 'Н.Мөнхтунгалаг',
    phone: '99112233',
  },
];

export const AdminOwnerPost = () => {
  return (
    <div className="container h-[767px]  max-w-[1280px] mx-auto mt-8">
      <div className="mt-6">
        <p className="font-semibold text-xl">Зарууд</p>
      </div>
      <div className="flex p-1 justify-between mt-6">
        <div>
          <input placeholder="Хайлт" className=" px-2 py-1 w-[783px] text-[#81717A] text-[14px] font-normal rounded-sm border-[2px]" />
        </div>
        <div className="flex gap-3 bg-[#d0d0d2] text-[#71717A] px-3 text-[14px] font-medium items-center rounded-lg cursor-pointer  ">
          <p className="hover:bg-[#F4F4F5] rounded-sm px-1 transition-all">Хүсэлт илгээсэн</p>
          <p className="hover:bg-[#F4F4F5] rounded-sm px-1 transition-all">Зөвшөөрсөн</p>
          <p className="hover:bg-[#F4F4F5] rounded-sm px-1 transition-all">Татгалзсан</p>
          <p className="hover:bg-[#F4F4F5] rounded-sm px-1 transition-all">Админ хассан</p>
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
              {data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition cursor-pointer" style={{ height: '64px' }}>
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <HouseIcon />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-2 border">{item.owner}</td>
                  <td className="px-4 py-2 border">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
