const TicketSubscriber = () => {
  return (
    <div className="w-[628px] mx-auto mt-[100px] h-[288px] bg-[#131313] rounded-xl p-[20px] flex-col items-center">
      <div className="text-white font-semibold text-[24px]">Захиалагчийн мэдээлэл</div>
      <div className="my-[10px]">
        <p className="text-[#FAFAFA]">Утасны дугаа:</p>
        <input className="bg-black text-[13px] w-[450px] text-[white] pl-[10px] h-[36px] border-[#27272A] my-[10px] border-2 rounded-sm" type="texted" placeholder="9900-0000" />
      </div>
      <div className="my-[10px]">
        <p className="text-[#FAFAFA]">Имэйл хаяг:</p>
        <input className="bg-black text-[13px] texted-[#A1A1AA] pl-[10px] border-[#27272A] text-white w-[450px] h-[36px] my-[10px] border-2 rounded-sm " type="texted" placeholder="Нэр@жишээ.com" />
      </div>
    </div>
  );
};
export default TicketSubscriber;
