import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
export const BathroomInfo = ['Bathrobes', 'Free toiletries', 'Hair dryer', 'Private Bathroom', 'Shower/tub combination', 'Slippers', 'Toothbrush and toothpaste', 'Towels'];

export const AccessibilityInfo = ['Thin carpet in room', 'Access via exterior corridors'];

export const EntertainmentInfo = ['Cable channels', 'TV'];

export const FoodandDrinkInfo = ['Electric kettle', 'Free bottled water', 'Minibar (fees may apply)', 'Room service (limited)'];

export const BedroomInfo = ['Air conditioning', 'Bed sheets', 'Cribs (infant beds) not available', 'Heating'];

export const OtherInfo = ['Daily housekeeping', 'Desk', 'Laptop workspace', 'Phone', 'Safe', 'Sitting area', 'Soundproofed rooms', 'Wardrobe or closet'];
  
export const RoomServicesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-blue-600 bg-white hover:bg-white">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[626px]">
        <DialogHeader>
          <DialogTitle>Room Services</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mb-5 text-sm">
          <div className="space-y-2">
            <p>Bathroom</p>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {BathroomInfo.map((item, index) => {
                return (
                  <div key={index} className="flex rounded-md ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p>Accessibility</p>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {AccessibilityInfo.map((item, index) => {
                return (
                  <div key={index} className="flex  ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p>Entertainment</p>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {EntertainmentInfo.map((item, index) => {
                return (
                  <div key={index} className="flex  ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p>Food and drink</p>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {FoodandDrinkInfo.map((item, index) => {
                return (
                  <div key={index} className="flex  ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p>Bedroom</p>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {BedroomInfo.map((item, index) => {
                return (
                  <div key={index} className="flex  ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p>Other</p>
            <div className=" border py-2 px-3 flex-wrap gap-2 flex w-full rounded-md">
              {OtherInfo.map((item, index) => {
                return (
                  <div key={index} className="flex  ">
                    <div className=" rounded-xl text-xs font-semibold px-2 py-1 bg-[#F4F4F5]"> {item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between w-full">
          <Button type="submit" className="bg-transparent text-black">
            Cancel
          </Button>
          <Button type="submit" className="bg-[#2563EB]">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
