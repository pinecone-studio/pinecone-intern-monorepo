import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import { Button } from '@/components/ui/button';

export const GuestInfo = () => {
  return (
    <DetailsContainer name={'Shagai Nyamdorj'}>
      <DetailsLeft>
        Í
        <DetailsCard>
          <div>
            <div>Guest Info</div>
            <div className="border w-full my-4 bg-slate-300"></div>
          </div>
          <div className="flex">
            <div className="flex flex-1">
              <div className="flex flex-col">
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1">First name</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">Shagai</div>
                </div>
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1 mt-5">Status</div>
                  <div className="">
                    <button className="text-white bg-blue-600 px-3 py-1 text-xs rounded-lg">Booked</button>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1">Check in</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">Oct 20, Monday, Jul 1, 3:00pm</div>

                  <div className="text-[#09090B] flex flex-1 text-sm font-normal"></div>
                </div>
              </div>
            </div>
            <div className="text-[#71717A] flex flex-1 text-sm font-normal">
              <div className="flex flex-col">
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1">Last name</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">Nyamdorj</div>
                </div>
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1 mt-5">Guests</div>

                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">1 adult, 0 children</div>
                </div>
                <div className="mt-5">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1">Check out</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">Oct 21, Tuesday, Jul 3, 11:00am</div>

                  <div className="text-[#09090B] flex flex-1 text-sm font-normal"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="border w-full my-4 bg-slate-300"></div>
          <div className="flex">
            <div className="text-[#71717A] flex flex-1">
              <div className="flex flex-col">
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1">Email</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">n.shagai@pinecone.mn</div>
                </div>
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1 mt-5">Guest Request</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">No Request</div>
                </div>
              </div>
            </div>
            <div className="text-[#71717A] flex flex-1">
              <div className="flex flex-col">
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1">Phone number</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">+976 99112233</div>
                </div>
                <div className="">
                  <div className="text-[#71717A] flex flex-1 text-sm font-normal mb-1 mt-5">Room Number</div>
                  <div className="text-[#09090B] flex flex-1 text-sm font-normal mb-1">Room #502</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="text-white bg-blue-600">Checkout</Button>
          </div>
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2">
              <div>Economy Double Room, City View</div>
              <Button variant="ghost" className="text-[#2563EB]">
                View
              </Button>
            </div>
            <div className="flex bg-blue-100 w-full h-56 m-auto"></div>
          </div>
        </DetailsCard>
        <DetailsCard>
          <div>
            <div className="sm:max-w-[600px]">
              <h3 className="mb-4">Price Detail </h3>
              <div className="flex flex-col">
                <div className=" w-full flex justify-between">
                  <div className="flex flex-col">
                    <p className=" font-thin">1 night</p>
                    <p className="text-stone-500">₮150,000 per night</p>
                  </div>
                  <div className="flex mt-3">₮ 150,000</div>
                </div>
                <div className=" w-full flex justify-between items-center py-5">
                  <div className="flex">
                    <p className=" font-thin">Taxes</p>
                  </div>
                  <div className="flex">₮ 12,000</div>
                </div>

                <div className="border w-full my-2 bg-slate-300"></div>
                <div className=" w-full flex justify-between">
                  <div className="flex font-normal">Total price</div>
                  <div className="flex  text-lg font-semibold">₮ 162,000</div>
                </div>
              </div>
            </div>
          </div>
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
