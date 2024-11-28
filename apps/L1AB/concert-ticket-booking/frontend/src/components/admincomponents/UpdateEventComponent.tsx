import { DialogItem } from '@/components';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PenIcon } from 'lucide-react';

export const UpdateEventComponent = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <PenIcon className="bg-[#F4F4F5] rounded p-1" />
      </DialogTrigger>
      <DialogContent className=" flex max-w-[640px] p-9 flex-col items-start gap-4 border-[1px] border-[#E4E4E7] bg-[#fff] shadow-xs">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Тасалбар шинэчлэх</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogItem htmlFor="eventName" name="Тоглолтын нэр">
          <Input placeholder="Нэр оруулах" name="eventName" />
        </DialogItem>
        <DialogItem htmlFor="description" name="Хөтөлбөрийн тухай">
          <Textarea className="min-h-16" placeholder="Дэлгэрэнгүй мэдээлэл" name="description" />
        </DialogItem>
        <DialogItem htmlFor="artistName" name="Үндсэн артистын нэр">
          <Input placeholder="Артистын нэр" name="artistName" />
          <Button className="w-fit" variant="outline">
            Бусад артист нэмэх +
          </Button>
        </DialogItem>
        {/* <div className="flex justify-between w-full gap-2">
          <DialogItem htmlFor="eventDate" name="Тоглолтын өдөр сонгох">
            <DatePickerWithRange  />
          </DialogItem>
          <DialogItem htmlFor="eventTime" name="Тоглолтын цаг сонгох">
            <TimePicker />
          </DialogItem>
        </div> */}
        <div className="flex w-full gap-2">
          <DialogItem htmlFor="vip" name="VIP">
            <Input type="number" placeholder="Нийт тоо хэмжээ" name="vip" />
          </DialogItem>
          <DialogItem htmlFor="vipQuantity" withLabel={false}>
            <Input type="number" placeholder="Үнэ" name="vipQuantity" />
          </DialogItem>
        </div>
        <div className="flex w-full gap-2">
          <DialogItem htmlFor="regular" name="Regular">
            <Input type="number" placeholder="Нийт тоо хэмжээ" name="regular" />
          </DialogItem>
          <DialogItem htmlFor="regularQuantity" withLabel={false}>
            <Input type="number" placeholder="Үнэ" name="regularQuantity" />
          </DialogItem>
        </div>
        <div className="flex w-full gap-2">
          <DialogItem htmlFor="open" name="Задгай">
            <Input type="number" placeholder="Нийт тоо хэмжээ" name="open" />
          </DialogItem>
          <DialogItem htmlFor="openQuantity" withLabel={false}>
            <Input type="number" placeholder="Үнэ" name="openQuantity" />
          </DialogItem>
        </div>
        <Button className="w-full">Шинэчлэх</Button>
      </DialogContent>
    </Dialog>
  );
};
