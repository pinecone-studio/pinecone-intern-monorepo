import { Booking } from '@/generated';
import { CheckoutDialog } from '../ui/dialog';

export type GuestInfoMainProps = {
  data: Booking | undefined | null;
  handleEditBookingStatus: (_newStatus: string) => Promise<void>;
};

const statusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    Completed: 'bg-[#18BA51]',
    Cancelled: 'bg-[#F97316]',
    Booked: 'bg-[#2563EB]',
  };

  return statusMap[status] || 'bg-[#2563EB]';
};

const Divider = () => (
  <div className="py-6">
    <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 w-full">
    <p className="font-Inter text-[#71717A] text-sm font-normal">{label}</p>
    <p className="font-Inter text-[#09090B] text-sm font-medium">{value}</p>
  </div>
);

const GuestInfoSection = ({ data }: { data: Booking | undefined | null }) => (
  <div className="flex flex-col gap-6">
    <div className="flex items-center gap-6">
      <InfoRow label="First name" value="Shagai" />
      <InfoRow label="Last name" value="Nyamdorj" />
    </div>
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-1 w-full">
        <p className="font-Inter text-[#71717A] text-sm font-normal">Status</p>
        <div className="flex">
          <p className={`px-[10px] py-[2px] rounded-full text-[#FAFAFA] font-Inter text-xs font-semibold transition-all duration-200 ${statusClass(data?.status || '')}`}>{data?.status || '-/-'}</p>
        </div>
      </div>
      <InfoRow label="Guests" value="1 adult, 0 children" />
    </div>
    <div className="flex items-center gap-6">
      <InfoRow label="Check in" value="Oct 20, Monday, Jul 1, 3:00pm" />
      <InfoRow label="Check out" value="Oct 21, Tuesday, Jul 3, 11:00am" />
    </div>
  </div>
);

export const GuestInfoContainer = ({ data, handleEditBookingStatus }: GuestInfoMainProps) => {
  return (
    <div className="border border-[#E4E4E7] rounded-[8px] bg-white p-6 flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Guest Info</p>
        <Divider />
        <GuestInfoSection data={data} />
        <Divider />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <InfoRow label="Email" value={data?.email || '-/-'} />
            <InfoRow label="Phone number" value={data?.phoneNumber || '-/-'} />
          </div>
          <div className="flex items-center gap-6">
            <InfoRow label="Guest Request" value={data?.guestRequest || '-/-'} />
            <InfoRow label="Room Number" value="Room #502" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <CheckoutDialog handleEditBookingStatus={handleEditBookingStatus} />
      </div>
    </div>
  );
};
