import { Button } from '@/components/ui/button';

export const HotelDetailsLocation = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Location</h3>
        <Button className="border-none text-[#2563EB]" variant="outline">
          Edit
        </Button>
      </div>

      <h3 className="text-base ">Ulaanbaatar</h3>
      <p>Ulaanbaatar hotel in Downtown Ulaanbaatar with 4 restaurants and a full-service spa</p>
    </div>
  );
};
