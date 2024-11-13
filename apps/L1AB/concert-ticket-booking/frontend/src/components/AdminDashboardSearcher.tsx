"use client"
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../../../../../libs/shadcn/src/lib/utils";
import { Input } from "@mui/material";


export const AdminSearcher = () => {
  const [date, setDate] = React.useState<Date>();
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleSelectChange = (value: string) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((item) => item !== value); 
      } else {
        return [...prevValues, value]; 
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedValues([]); 
  };

  return (
    <div className="flex justify-between ">
      <div className="flex gap-2 ">
        <div>
          <input
            type="search"
            placeholder="Тасалбар хайх"
            className="pl-3 w-[251px] h-[36px] border rounded bg-[#ffff] text-[1]"
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] h-[36px]">
              <SelectValue placeholder=" + Уран бүтээлч" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Уран бүтээлч</SelectLabel>
                <SelectItem  value="Хурд">Хурд</SelectItem>
                <SelectItem value="Харанга">Харанга</SelectItem>
                <SelectItem value="Davaidasha">Davaidasha</SelectItem>
                <SelectItem value="Болдбаатар">Болдбаатар</SelectItem>
                <SelectItem value="Ариунаа">Ариунаа</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
  type="text"
  className={`pl-3 mr-auto h-[36px] w-fit ${selectedValues.length > 0 ? 'bg-gray-50 text-[12px] border-l-2 pl-2' : ''}`} 
  value={selectedValues.join(" ")} 
  readOnly 
  required
/>
        </div>
        <div className="flex items-center bg-white border rounded px-5 text-[14px] h-[36px] gap-5">
          <span>Цэвэрлэх</span>
          <button type="button" onClick={handleClearSelection}>
            X
          </button>
        </div>
      </div>

      {/* Popover for selecting a date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-between text-left font-normal h-[36px]",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "dd MMM yyyy") : <span>Өдөр сонгох</span>}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
