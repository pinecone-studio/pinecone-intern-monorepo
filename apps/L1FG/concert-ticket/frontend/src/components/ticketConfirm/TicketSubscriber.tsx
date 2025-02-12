const TicketSubscriber = ({ handleChange }: { handleChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }) => {
  return (
    <div className=" mx-auto  bg-[#131313] rounded-xl p-8 flex flex-col gap-6 items-center">
      <div className="text-white font-light text-xl">Захиалагчийн мэдээлэл</div>
      <div className="">
        <p className="text-[#FAFAFA] font-thin text-base">Утасны дугаар:</p>
        <input
          data-testid="reservation-phone-number-input"
          onChange={(event) => handleChange({ target: { name: 'phoneNumber', value: event.target.value } as HTMLInputElement } as React.ChangeEvent<HTMLInputElement>)}
          className="bg-black text-[13px] w-[564px] text-[white] pl-[10px] h-[36px] border-[#27272A] my-[10px] border rounded-md"
          type="number"
          placeholder="9900-0000"
        />
      </div>
      <div>
        <p className="text-[#FAFAFA] font-thin text-base ">Имэйл хаяг:</p>
        <input
          data-testid="reservation-email-input"
          onChange={(event) => handleChange({ target: { name: 'email', value: event.target.value } as HTMLInputElement } as React.ChangeEvent<HTMLInputElement>)}
          className="bg-black text-[13px] texted-[#A1A1AA] pl-[10px] border-[#27272A] text-white  w-[564px] h-[36px] my-[10px] border rounded-md"
          type="texted"
          placeholder="Нэр@жишээ.com"
        />
      </div>
    </div>
  );
};
export default TicketSubscriber;
