import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { IoChevronBack } from 'react-icons/io5';
export const CancelBookingDialog = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-start w-full">
          <button className="w-[32px] h-[32px] border border-gray-300 rounded-xl justify-center items-center flex">
            <IoChevronBack />
          </button>
          <h1 className="font-bold mt-5">Cancellation rules</h1>
        </div>
        <div className="w-[626px] h-[252px] text-s flex flex-col justify-between">
          <div className="mt-3">
            <h1>Free cancellation until Jun 30 at 4:00 pm (Pacific Standard Time (US & Canada); Tijuana).</h1>
          </div>
          <div>
            <h1>If you cancel or change your plans, please cancel your reservation in accordance with the property’s cancellation policies to avoid a no-show charge.</h1>
          </div>
          <div>
            <h1>There is no charge for cancellations made before 4:00 pm (property local time) on Jun 30, 2024.</h1>
          </div>
          <div>
            <h1>
              Cancellations or changes made after 4:00 pm (property local time) on Jun 30, 2024, or no-shows are subject to a property fee equal to 100% of the total amount paid for the reservation.
            </h1>
          </div>
        </div>
        <div className="w-[626px] h-[1px] border border-gray-300 mt-5"></div>
        <div className="mt-5">
          <h1 className="font-bold">Standard Single Room, 1 King Bed</h1>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-[626px] h-[36px] bg-blue-600 rounded-xl mt-3 justify-center items-center flex">
                  <h1 className="text-white">Cancel Booking</h1>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="flex flex-col gap-3">
                    <DialogTitle>Cancel booking?</DialogTitle>
                    <DialogDescription>The property won’t charge you.</DialogDescription>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-3">
                      <div className="w-[480px] flex flex-row justify-between">
                        <div className="text-white">.</div>
                        <div className="flex flex-row gap-3">
                          <DialogClose asChild>
                            <button className="w-[116px] h-[36px] border rounded-md">Keep Booking</button>
                          </DialogClose>
                          <button className="w-[171px] h-[36px] border rounded-md bg-blue-600 text-white flex justify-center items-center">Confirm cancellation</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-[626px] h-[1px] border border-gray-300 mt-7"></div>
        <div>
          <h1 className="font-bold mt-8">Property Support</h1>
        </div>
        <div>
          <h1 className="mt-5">For special request or questions about your reservation, contact Chingis Khan Hotel</h1>
        </div>
        <div className="flex flex-col mt-3">
          <h3>Itinerary:</h3>
          <h1>72055771948934</h1>
        </div>
        <button className="w-[626px] h-[36px] rounded-xl mt-3 justify-center items-center border">
          <h1>Call +976 7270 0800</h1>
        </button>
      </div>
    </div>
  );
};
