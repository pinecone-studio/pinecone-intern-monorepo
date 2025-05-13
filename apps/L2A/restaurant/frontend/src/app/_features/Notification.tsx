export const Notification = () => {
  return (
    <div className="max-w-sm mx-auto rounded-xl  p-4">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Мэдэгдэл</h2>
      </div>
      <div className="p-4 space-y-2">
        <div className="p-3 bg-[#FFFFFF] rounded-lg border">
          <p className="text-sm text-gray-700">#32193 Таны захиалсан хоол бэлтгэгдлээ.</p>
          <span className="text-xs text-black  px-2 py-1 rounded-full border">Хүлээгдэж буй</span>
          <p className="text-xs text-gray-500 mt-2">24.10.19 15:25</p>
        </div>
        <div className="p-3 bg-[#FFFFFF] rounded-lg border">
          <p className="text-sm text-gray-700">#32193 Таны захиалга хийгдэж эхэллээ.</p>
          <span className="text-xs text-black  px-2 py-1 rounded-full border">Бэлтгэгдэж буй</span>
          <p className="text-xs text-gray-500 mt-2">24.10.19 12:37</p>
        </div>
        <div className="p-3 bg-[#FFFFFF] rounded-lg border">
          <p className="text-sm text-gray-700">#33998 Таны захиалга бэлтгэгдэх дууслаа.</p>
          <span className="text-xs text-black px-2 py-1 rounded-full border">Амжилттай</span>
          <p className="text-xs text-gray-500 mt-2">24.10.19 13:21</p>
        </div>
        <div className="p-3 bg-[#FFFFFF] rounded-lg border">
          <p className="text-sm text-gray-700">#34021 Таны захиалга амжилттай хүргэгдлээ.</p>
          <span className="text-xs text-black  px-2 py-1 rounded-full border">Амжилттай</span>
          <p className="text-xs text-gray-500 mt-2">24.10.19 12:47</p>
        </div>
      </div>
    </div>
  );
};