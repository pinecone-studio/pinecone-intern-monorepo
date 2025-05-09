export const CreatePostButton = () => {
  return (
    <div className="w-auto h-[636.5px] flex flex-col gap-4 rounded-lg">
      <div>
        <div className="text-[#09090B]">Хэрэглэгчдэд харагдах</div>
        <div className="text-[#71717A]">Таны оруулсан мэдээлэл хэрэглэгчдэд харагдах үзүүлэлт</div>
      </div>
      <div className="w-auto h-[420.5px] bg-[#71717A]">picture</div>
      <button type="submit" className="bg-[#F97316] text-[#FAFAFA] p-2 rounded-lg">
        Зар оруулах хүсэлт илгээх
      </button>
      <button type="submit" className="bg-[#FFFFFF] text-[#18181B] p-2 rounded-lg">
        Хадгалаад гарах
      </button>
    </div>
  );
};
