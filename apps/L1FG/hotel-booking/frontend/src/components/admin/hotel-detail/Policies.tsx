import { HotelDetailMainProps } from '@/components/user/hotel-detail/HotelDetailMain';
import { AmericanExpressCard, Card, MasterCard, VisaCard } from '../svg';

export const Policies = ({ data }: HotelDetailMainProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Policies</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <div className="w-full flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-lg font-semibold">Check-in</p>
            <p className="text-[#09090B] font-Inter text-sm font-normal">{data?.faqs?.[0]?.value ?? '-/-'}</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-lg font-semibold">Check-out</p>
            <p className="text-[#09090B] font-Inter text-sm font-normal">{data?.faqs?.[1]?.value ?? '-/-'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Special check-in instructions</p>
          <p className="text-[#09090B] font-Inter text-sm font-normal">-/-</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Access methods</p>
          <p className="text-[#09090B] font-Inter text-sm font-normal">Staffed front desk</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Pets</p>
          <p className="text-[#09090B] font-Inter text-sm font-normal">No pets or service animals allowed</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Children and extra beds</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Property payment types</p>
          <div className="flex items-center">
            <Card />
            <VisaCard />
            <MasterCard />
            <AmericanExpressCard />
          </div>
        </div>
      </div>
    </div>
  );
};
