import { Quwstions } from './Quwstions';
import { Important } from './Important';
import { Policies } from './Policies';
import { AboutProperty } from './AboutProperty';

export const About = () => {
  return (
    <div className="w-full px-10 flex flex-col mx-auto items-start gap-8">
      <AboutProperty />
      <div className="w-full py-4 flex justify-center">
        <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
      </div>
      <Policies />
      <div className="w-full py-4 flex justify-center">
        <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
      </div>
      <Important />
      <div className="w-full py-4 flex justify-center">
        <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
      </div>
      <Quwstions />
    </div>
  );
};

{
  /* <div className="w-full max-w-[736px] gap-[40px] border border-red-500">
<div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
  <p>Is Flower Hotel Ulaanbaatar pet-friendly?</p> <ChevronDown className="w-[16px] h-[16px]" />
</div>
<div className="flex flex-col  gap-2">
  <div className="flex justify-between items-center  text-base font-medium font-Inter leading-6 py-2">
    <p>How much is parking at Flower Hotel Ulaanbaatar?</p> <ChevronUp className="w-[16px] h-[16px]" />
  </div>
  <p className="border-b-[1px] text-sm font-normal leading-5 font-Inter py-2">Self parking is free at this property.</p>
</div>
<div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
  <p> What time is check-in at Flower Hotel Ulaanbaatar?</p> <ChevronDown className="w-[16px] h-[16px]" />
</div>
<div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
  <p> What time is check-out at Flower Hotel Ulaanbaatar?</p> <ChevronDown className="w-[16px] h-[16px]" />
</div>
<div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
  <p> Does Flower Hotel Ulaanbaatar provide a shuttle to the airport?</p> <ChevronDown className="w-[16px] h-[16px]" />
</div>
<div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
  <p> Where is Flower Hotel Ulaanbaatar located?</p> <ChevronDown className="w-[16px] h-[16px]" />
</div>
</div> */
}
