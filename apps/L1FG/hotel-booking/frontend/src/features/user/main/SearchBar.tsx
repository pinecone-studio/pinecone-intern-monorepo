import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DatePickerWithRange } from './DatePickerWithRange';
import { useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [isButtonHid, setIsButtonHid] = useState<boolean>(false);
  const [adultCount, setAdultCount] = useQueryState('bedcount');
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const [adult, setAdult] = useState<number>(adultCount ? Number(adultCount) : 1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleAdultPlus = () => {
    if (adult < 4) {
      setAdult((prev) => prev + 1);
    }
  };

  const handleAdultMinus = () => {
    if (adult > 1) {
      setAdult((prev) => prev - 1);
    }
  };

  const handleDone = () => {
    setAdultCount(adult.toString());
    setIsOpen(false);
  };

  const handleClickButton = () => {
    if (isButtonHid === true) {
      toast.error('Pleace select adult and date.!', {
        style: { backgroundColor: 'red', color: 'white' },
      });
    } else {
      router.push(`/search-hotels?bedcount=${adult}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
    }
  };

  useEffect(() => {
    if (dateTo && dateFrom && adult) {
      setIsButtonHid(false);
    } else {
      setIsButtonHid(true);
    }
  }, [dateFrom, dateTo, adult]);

  return (
    <div>
      <div className="absolute w-full h-12 bg-[#013B94]"></div>
      <div className="relative container mx-auto px-[60px]">
        <div className="flex justify-between gap-4 w-full h-full bg-white border-[3px] border-[#FFB700] rounded-[8px] p-4">
          {/* Огноо сонголт */}
          <div className="flex flex-col gap-2 max-w-[500px] w-full">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Dates</p>
            <DatePickerWithRange />
          </div>

          {/* Зочдын тоо сонголт */}
          <div className="flex flex-col gap-2 max-w-[500px] w-full">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Guest</p>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger
                data-testid="menutrigger"
                className="flex hover:bg-[#F4F4F5] items-center w-full h-10 rounded-[6px] justify-between text-sm font-normal px-4 py-2 border border-[#E4E4E7]"
              >
                {adult} traveller, 1 room
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:min-w-[370px] xl:w-[500px] p-0">
                <div className="max-w-[500px] w-full p-5 max-h-[800px]">
                  <div className="flex flex-col gap-3">
                    <p className="font-Inter font-semibold not-italic text-lg text-[#09090B]">Travellers</p>
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Adult</p>
                      <div className="flex">
                        <button className="px-4 py-2 w-9 h-9 flex items-center justify-center border border-[#E4E4E7] rounded-[10px]" onClick={handleAdultMinus} disabled={adult <= 1}>
                          -
                        </button>
                        <p className="w-9 h-9 flex items-center justify-center">{adult}</p>
                        <button
                          data-testid="adult-quantity-plus-button"
                          className="px-4 py-2 w-9 h-9 flex items-center justify-center border border-[#E4E4E7] rounded-[10px]"
                          onClick={handleAdultPlus}
                          disabled={adult >= 4}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-[0.5px] my-4"></div>
                  <div className="w-full flex items-center justify-end">
                    <button onClick={handleDone} className="px-6 py-2 flex items-center justify-center rounded-md h-10 bg-[#2563EB]">
                      <p className="font-Inter font-medium not-italic text-sm text-[#FAFAFA]">Done</p>
                    </button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Хайх товч */}
          <div className="flex items-end">
            <button onClick={() => handleClickButton()} className="bg-[#2563EB] px-6 py-2 flex items-center justify-center rounded-md h-10">
              <p className="text-[#FAFAFA] font-Inter text-sm font-medium">Search</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
