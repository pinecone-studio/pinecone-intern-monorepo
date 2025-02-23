import Link from 'next/link';
import { LeftArrow } from '@/components/admin/svg';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { useEditBookingStatusMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loading } from '../../../components/user/main/Loading';

interface CancelBookingContentProps {
  idParams?: string;
}

export const CancelBookingContent = ({ idParams }: CancelBookingContentProps) => {
  const [open, setOpen] = useState(false); // useState-ийг эхэнд байрлуулсан
  const [cancel, { loading, data }] = useEditBookingStatusMutation();
  const router = useRouter();

  if (loading || data) return <Loading />; // useState-ийг үүнээс өмнө байрлуулсан

  const cancelBooking = async () => {
    try {
      const response = await cancel({ variables: { input: { id: idParams || '', status: 'Cancelled' } } });
      if (response) {
        toast.success('Successfully canceled.', {
          style: { backgroundColor: 'white', color: 'black' },
        });
        router.push('/booking');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-w-[690px] max-h-[872px] w-full h-full flex flex-col gap-6 p-8">
        <Link
          href="/booking"
          className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4F4F5] duration-200"
        >
          <LeftArrow />
        </Link>
        <div className="w-full flex flex-col gap-4">
          <p className="font-Inter font-semibold not-italic text-xl tracking-tighter">Cancellation rules</p>
          <div className="w-full flex flex-col gap-3">
            <p className="font-Inter font-normal not-italic text-base">Free cancellation until Jun 30 at 4:00 pm (Pacific Standard Time (US & Canada); Tijuana). </p>
            <p className="font-Inter font-normal not-italic text-base">
              If you cancel or change your plans, please cancel your reservation in accordance with the property&apos;s cancellation policies to avoid a no-show charge.
            </p>
            <p className="font-Inter font-normal not-italic text-base">There is no charge for cancellations made before 4:00 pm (property local time) on Jun 30, 2024.</p>
            <p className="font-Inter font-normal not-italic text-base">
              Cancellations or changes made after 4:00 pm (property local time) on Jun 30, 2024, or no-shows are subject to a property fee equal to 100% of the total amount paid for the reservation.
            </p>
          </div>
          <div className="w-full py-4">
            <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <div className="w-full py-2 px-3 bg-[#2563EB] rounded-md">
                  <p className="font-Inter font-medium not-italic text-sm text-white">Cancel Booking</p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[480px]">
                <DialogHeader>
                  <DialogTitle>Cancel Booking?</DialogTitle>
                  <div className="flex flex-col gap-6">
                    <DialogDescription>The property won&apos;t charge you.</DialogDescription>
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setOpen(false)} className="py-2 px-4 border border-[#E4E4E7] rounded-md">
                        <p className="font-Inter font-medium not-italic text-sm">Keep booking</p>
                      </button>
                      <button onClick={cancelBooking} className="py-2 px-4 bg-[#2563EB] rounded-md">
                        <p className="font-Inter font-medium not-italic text-sm text-white">Confirm cancellation</p>
                      </button>
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full py-4">
            <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="font-Inter font-semibold not-italic text-xl tracking-tighter">Property Support</p>
            <p className="font-Inter font-normal not-italic text-base">For special request or questions about your reservation, contact Chingis Khan Hotel</p>
            <div className="w-full flex flex-col gap-1">
              <p className="font-Inter font-normal not-italic text-sm text-[#71717A]">Itinerary:</p>
              <p className="font-Inter font-normal not-italic text-base">72055771948934</p>
            </div>
            <button className="w-full py-2 px-3 border border-[#E4E4E7] rounded-md">
              <p className="font-Inter font-medium not-italic text-sm">Call +976 7270 0800</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
