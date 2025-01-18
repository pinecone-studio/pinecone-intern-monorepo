import { DatePickerWithRange } from './DatePickerWithRange';

import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const SearchBar = () => {
  return (
    <main>
      <div className="absolute w-full h-12 bg-[#013B94]"></div>
      <div className="relative container mx-auto px-[60px]">
        <div className="flex justify-between gap-4 w-full h-full bg-white border-[3px] border-[#FFB700] rounded-[8px] p-4">
          <div className="flex flex-col gap-2 max-w-[500px] w-full">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Dates</p>
            <DatePickerWithRange />
          </div>
          <div className="flex flex-col gap-2 max-w-[500px] w-full">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Guest</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex hover:bg-[#F4F4F5] items-center focus:border focus:border-none w-full h-10 rounded-[6px] justify-between text-sm font-normal px-4 py-2 border border-[#E4E4E7]">
                1 traveller, 1 room
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:min-w-[370px] xl:w-[500px] p-0">
                <div className="max-w-[500px] w-full p-5 max-h-[800px]">
                  <div className="flex flex-col gap-3">
                    <p className="font-Inter font-semibold not-italic text-lg text-[#09090B]">Travels</p>
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Adult</p>
                      <div className="flex">
                        <button className="px-4 py-2 w-9 h-9 flex items-center justify-center border  border-[#E4E4E7] rounded-[10px]">-</button>
                        <p className="w-9 h-9 flex items-center justify-center">1</p>
                        <button className="px-4 py-2 w-9 h-9 flex items-center justify-center border  border-[#E4E4E7] rounded-[10px]">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-[0.5px] my-4"></div>
                  <div className="w-full flex items-center justify-end">
                    <button className="px-6 py-2 flex items-center justify-center rounded-md h-10 bg-[#2563EB] data-[state=false]">
                      <p className="font-Inter font-medium not-italic text-sm text-[#FAFAFA]">done</p>
                    </button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-end">
            <div className="bg-[#2563EB] px-6 py-2 flex items-center justify-center rounded-md h-10">
              <p className="text-[#FAFAFA] font-Inter text-sm font-medium">Search</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
