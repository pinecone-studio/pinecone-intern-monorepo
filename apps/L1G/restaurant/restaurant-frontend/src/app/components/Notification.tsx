import { Bell } from 'lucide-react';
import { X } from 'lucide-react';
export const Notification = () => {
  const notifinfo = [
    {
      id: 1,
      title: 'Хүлээгдэж буй',
      description: 'Таны захиалга хүлээн авсан байна. Баярлалаа.',
      time: '2023-10-01 12:00',
    },
    {
      id: 2,
      title: ' Бэлтгэгдэж буй',
      description: 'Таны захиалга бэлэн боллоо. Та ирж аваарай.',
      time: '2023-10-01 12:05',
    },
    {
      id: 3,
      title: 'Амжилттай',
      description: 'Таны захиалга амжилттай хүргэгдлээ.',
      time: '2023-10-01 12:10',
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="flex justify-between px-6 pt-5">
        <Bell />
        <X />
      </div>
      <div className="pt-4">
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
      <div>
        <p className="font-semibold pl-5 pt-3 text-[#441500]">Мэдэгдэл</p>
      </div>
      <div className="flex flex-col items-center pt-5">
        {notifinfo.map((item) => (
          <div key={item.id} className="w-[90%] bg-white shadow-md rounded-md border-[1px] p-4 mb-4 flex flex-col">
            <div className="flex flex-col  ">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-14 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bell />
                </div>
                <p className="text-gray-700 mt-2">{item.description}</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-small font-semibold border-[1px] w-fit rounded-full px-1 py-1 text-[#441500]">{item.title}</h3>
                <span className="text-sm flex items-center text-gray-500">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
