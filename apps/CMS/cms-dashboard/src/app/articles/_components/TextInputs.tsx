export const TextInputs = () => {
  return (
    <div className="w-[1440px] h-[1024px] bg-slate-100 flex pl-40">
      <div className="flex-col ">
        <h1 className="font-semibold text-lg pt-28 pb-5">Гарчиг өгөх</h1>
              <input type="text" placeholder="Энд гарчгаа бичнэ үү..." className="input w-[880px] h-[64px]  rounded-lg pl-5 " />
              <h1 className="font-semibold text-lg pt-28 pb-12">Нийтлэлээ бичих</h1>
        <input type="text" placeholder="Бичиж эхлэх..." className="input w-[880px] h-[237px]  rounded-lg pl-5 pb-[12]" />
      </div>
    </div>
  );
};
