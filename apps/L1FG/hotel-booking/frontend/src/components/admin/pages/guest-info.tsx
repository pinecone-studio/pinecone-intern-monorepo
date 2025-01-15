import Link from 'next/link';
import { Footer } from '../main/Footer';
import { Header } from '../main/Header';
import { Sidebar } from '../main/Sidebar';
import { LeftArrow } from '../svg';

export const GuestInfo = () => {
  return (
    <div className="flex">
      <Sidebar hotels="" guests="active" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full flex justify-center bg-[#F4F4F5]">
          <div className="py-4 flex flex-col gap-4 max-w-[1200px] w-full">
            <div className="flex items-center gap-4">
              <Link href="/admin/guests" className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                <LeftArrow />
              </Link>
              <p className="font-Inter text-[#020617] text-lg font-semibold">Shagai Nyamdorj</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[744px] w-full border border-[#E4E4E7] rounded-[8px] bg-white p-6 flex flex-col gap-4">
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
                  <div className="px-8 py-2 rounded-[6px] bg-[#2563EB] text-[#FAFAFA] font-Inter text-sm font-medium">Checkout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
