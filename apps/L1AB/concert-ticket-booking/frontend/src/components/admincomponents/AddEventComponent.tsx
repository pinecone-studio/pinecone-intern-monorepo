'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AddImage, DatePickerWithRange } from '@/components';
import { DialogItem } from '@/components';
import { TimePicker } from '@/components';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircleIcon } from 'lucide-react';
import { useCreateEventMutation } from '@/generated';
import { AddEventVenue } from './AddEventVenue';

export const AddEventComponent = () => {
  const [createEvent] = useCreateEventMutation();
  const [isOpen, setIsOpen] = useState(false);
  type Venue = {
    firstquantity: number;
    name: string;
    price: number;
    quantity: number;
  };

  const [formData, setFormData] = useState({
    name: '',
    artistName: [''],
    description: '',
    eventDate: [''],
    eventTime: [''],
    images: [''],
    discount: 0,
    venues: [
      { firstquantity: 0, name: 'Энгийн', price: 0, quantity: 0 },
      { firstquantity: 0, name: 'Fan-Zone', price: 0, quantity: 0 },
      { firstquantity: 0, name: 'Vip', price: 0, quantity: 0 },
    ],
  });

  const handleInputChange = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleVenueChange = <T extends keyof Venue>(index: number, field: T, value: Venue[T]) => {
    setFormData((prev) => {
      const updatedVenues = [...prev.venues];
      updatedVenues[index][field] = value;

      if (field === 'quantity' || field === 'firstquantity') {
        updatedVenues[index].quantity = value as number;
        updatedVenues[index].firstquantity = value as number;
      }

      return { ...prev, venues: updatedVenues };
    });
  };

  const handleSubmit = async () => {
    try {
      await createEvent({
        variables: {
          input: { ...formData },
        },
      });
      setFormData({
        name: '',
        artistName: [''],
        description: '',
        eventDate: [''],
        eventTime: [''],
        images: [''],
        discount: 0,
        venues: [
          { firstquantity: 0, name: 'Энгийн', price: 0, quantity: 0 },
          { firstquantity: 0, name: 'Fan-Zone', price: 0, quantity: 0 },
          { firstquantity: 0, name: 'Vip', price: 0, quantity: 0 },
        ],
      });
      toast.success('Event created successfully');
      setIsOpen(false);
    } catch (error) {
      console.log('Error creating event:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex self-stretch py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#18181B] shadow-sm text-[#fff]" data-testid="DialogOpen">
        Тасалбар Нэмэх
        <PlusCircleIcon />
      </DialogTrigger>
      <DialogContent className="flex max-w-[640px] p-9 flex-col items-start gap-4 border-[1px] border-[#E4E4E7] bg-[#fff] shadow-xs" data-testid="event-dialog-content">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Тасалбар Нэмэх</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogItem htmlFor="eventName" name="Тоглолтын нэр">
          <Input placeholder="Нэр оруулах" name="eventName" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
        </DialogItem>
        <AddImage />
        <DialogItem htmlFor="description" name="Хөтөлбөрийн тухай">
          <Textarea className="min-h-16" placeholder="Дэлгэрэнгүй мэдээлэл" name="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
        </DialogItem>
        <DialogItem htmlFor="artistName" name="Үндсэн артистын нэр">
          <Input placeholder="Артистын нэр" name="artistName" value={formData.artistName[0]} onChange={(e) => handleInputChange('artistName', [e.target.value])} />
          <Button className="w-fit" variant="outline">
            Бусад артист нэмэх +
          </Button>
        </DialogItem>
        <div className="flex justify-between w-full gap-2">
          <DialogItem htmlFor="eventDate" name="Тоглолтын өдөр сонгох" data-testid="open-date">
            <DatePickerWithRange data-testid="choose-date" value={formData.eventDate} onChange={(eventDate: string[]) => handleInputChange('eventDate', eventDate)} />
          </DialogItem>
          <DialogItem htmlFor="eventTime" name="Тоглолтын цаг сонгох" data-testid="time-picker">
            <TimePicker value={formData.eventTime} data-testid="timer" onChange={(eventTime: string) => handleInputChange('eventTime', [eventTime])} />
          </DialogItem>
        </div>

        <div className="flex w-full">
          <DialogItem htmlFor="Хямдрал" name="Хямдрал">
            <Input type="number" placeholder="Хямдралын хувь" value={formData.discount || ''} onChange={(e) => handleInputChange('discount', Number(e.target.value))} />
          </DialogItem>
        </div>
        <AddEventVenue handleVenueChange={handleVenueChange} formData={formData} />
        <Button className="w-full" onClick={handleSubmit} data-testid="createEventButton">
          Үүсгэх
        </Button>
      </DialogContent>
    </Dialog>
  );
};
