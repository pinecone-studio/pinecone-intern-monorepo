import { CheckoutDialog } from './dialog/CheckoutDialog';

export const GuestInfoLeft = () => {
  return (
    <div className="border border-[#E4E4E7] rounded-[8px] bg-white p-6 flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Guest Info</p>
        <div className="py-6">
          <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">First name</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">Shagai</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Last name</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">Nyamdorj</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Status</p>
              <div className="flex">
                <p className="px-[10px] py-[2px] rounded-full bg-[#2563EB] text-[#FAFAFA] font-Inter text-xs font-semibold">Booked</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Guests</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">1 adult, 0 children</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Check in</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">Oct 20, Monday, Jul 1, 3:00pm</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Check out</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">Oct 21, Tuesday, Jul 3, 11:00am</p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Email</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">n.shagai@pinecone.mn</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Phone number</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">+976 99112233</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Guest Request</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">No Request</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="font-Inter text-[#71717A] text-sm font-normal">Room Number</p>
              <p className="font-Inter text-[#09090B] text-sm font-medium">Room #502</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <CheckoutDialog />
      </div>
    </div>
  );
};
