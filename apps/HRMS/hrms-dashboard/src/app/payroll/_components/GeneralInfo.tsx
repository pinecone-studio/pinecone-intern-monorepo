const GeneralInfo = () => {
  return (
    <div className="flex flex-col justify-evenly w-[700px] h-[176px] p-4 border-[1px] rounded-[8px] border-[#E0E0E0]">
      <h2 className="font-bold">Ерөнхий мэдээлэл</h2>
      <div className="flex justify-between">
        <label>Үндсэн цалин</label>
        <label>8’000’000₮</label>
      </div>
      <div className="flex justify-between">
        <label>
          7 сард ажиллах ёстой хоног <span className="text-[#A8A8A8]">(цаг)</span>
        </label>
        <label>
          16 хоног <span className="text-[#A8A8A8]">(128 цаг)</span>
        </label>
      </div>
      <div className="flex justify-between">
        <label>Урьдчилгаа цалин тооцох хоног</label>
        <label>5 хоног</label>
      </div>
      <div className="flex justify-between">
        <label>Үлдэгдэл цалин тооцох хоног</label>
        <label>11 хоног</label>
      </div>
    </div>
  );
};

export default GeneralInfo;
