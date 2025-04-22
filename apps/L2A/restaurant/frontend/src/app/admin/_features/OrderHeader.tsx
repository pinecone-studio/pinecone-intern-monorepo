"use client";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"  
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"; // Огноог форматлахад ашиглана

export const OrderHeader = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="flex justify-between w-[600px] mt-[50px]">
      <p className="text-3xl font-bold">Захиалга</p>
      <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[100px] justify-start text-left border">
            {date ? format(date, "yyyy-MM-dd") : "Өнөөдөр"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(day) => setDate(day || null)}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
      <Select>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Төлөв" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Бэлэн">Бэлэн</SelectItem>
          <SelectItem value="Хүлээгдэж буй">Хүлээгдэж буй</SelectItem>
          <SelectItem value="Хийгдэж буй">Хийгдэж буй</SelectItem>
          <SelectItem value="Дууссан">Дууссан</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </div>
  );
};
