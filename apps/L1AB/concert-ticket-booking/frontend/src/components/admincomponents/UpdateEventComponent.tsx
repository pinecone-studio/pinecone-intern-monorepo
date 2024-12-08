'use client';
import { DatePickerWithRange, DialogItem, TimePicker } from '@/components';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGetEventByIdQuery, useUpdateEventMutation } from '@/generated';
import { PenIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { UpdateEventVenue } from './UpdateEventvenue';

type Venue = {
  firstquantity: number;
  name: string;
  price: number;
  quantity: number;
};
export const UpdateEventComponent = ({ eventId }: { eventId: string }) => {
  const [updateEvent] = useUpdateEventMutation();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [artistNames, setArtistNames] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState<string[]>([]);
  const [eventTime, setEventTime] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetEventByIdQuery({
    variables: { id: eventId },
  });
  const [formData, setFormData] = useState({
    name: '',
    artistNames: [''],
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
  useEffect(() => {
    if (data) {
      setName(data.getEventById.name);
      setDescription(data.getEventById.description);
      setArtistNames(data.getEventById.artistName);
      setEventDate(data.getEventById.eventDate);
      setEventTime(data.getEventById.eventTime);
      setFormData((prevData) => ({
        ...prevData,
        venues: data.getEventById.venues.map((venue: Venue) => ({
          firstquantity: venue.firstquantity,
          price: venue.price,
          quantity: venue.quantity,
          name: venue.name,
        })),
      }));
    }
  }, [data]);
  const handleAddArtist = () => {
    setArtistNames((prev) => [...prev, '']);
  };
  const handleArtistChange = (index: number, value: string) => {
    const updatedArtists = [...artistNames];
    updatedArtists[index] = value;
    setArtistNames(updatedArtists);
  };
  const handleInputChange = (field: string, value: string[]) => {
    if (field === 'eventDate') {
      setEventDate(value);
    }
    if (field === 'eventTime') {
      setEventTime(value);
    }
  };
  const handleVenueChange = <T extends keyof Venue>(index: number, field: T, value: Venue[T]) => {
    setFormData((prev) => {
      const updatedVenues = [...prev.venues];
      const updatedVenue = { ...updatedVenues[index] };
      updatedVenue[field] = value;
      updatedVenues[index] = updatedVenue;
      return { ...prev, venues: updatedVenues };
    });
  };
  const handleUpdateEvent = async () => {
    try {
      await updateEvent({
        variables: {
          input: {
            eventId,
            name,
            description,
            artistName: artistNames,
            eventDate,
            eventTime,
            venues: formData.venues.map((venue) => ({
              name: venue.name,
              firstquantity: venue.firstquantity,
              quantity: venue.quantity,
              price: venue.price,
            })),
          },
        },
      });
      setIsOpen(false);
      toast.success('Event updated successfully!');
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <PenIcon className="bg-[#F4F4F5] rounded p-1" data-testid="DialogOpen" />
      </DialogTrigger>
      <DialogContent className="flex max-w-[640px] p-9 flex-col items-start gap-4 border-[1px] border-[#E4E4E7] bg-[#fff] shadow-xs">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Тасалбар шинэчлэх</DialogTitle>
        </DialogHeader>
        <DialogItem htmlFor="eventName" name="Тоглолтын нэр">
          <Input placeholder="Нэр оруулах" value={name} onChange={(e) => setName(e.target.value)} />
        </DialogItem>
        <DialogItem htmlFor="description" name="Хөтөлбөрийн тухай">
          <Textarea className="min-h-16" placeholder="Дэлгэрэнгүй мэдээлэл" value={description} onChange={(e) => setDescription(e.target.value)} />
        </DialogItem>
        <DialogItem htmlFor="artistNames" name="Артистын нэр">
          {artistNames.map((artist, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input placeholder="Артистын нэр" value={artist} onChange={(e) => handleArtistChange(index, e.target.value)} />
              {artistNames.length > 1 && (
                <Button variant="outline" className="p-1" onClick={() => setArtistNames((prev) => prev.filter((_, i) => i !== index))}>
                  Устгах
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" onClick={handleAddArtist}>
            Бусад артист нэмэх
          </Button>
        </DialogItem>
        <div className="flex justify-between w-full gap-2">
          <DialogItem htmlFor="eventDate" name="Тоглолтын өдөр сонгох">
            <DatePickerWithRange data-testid="choose-date" value={eventDate} onChange={(date: string[]) => handleInputChange('eventDate', date)} />
          </DialogItem>
          <DialogItem htmlFor="eventTime" name="Тоглолтын цаг сонгох" data-testid="time-picker">
            <TimePicker value={eventTime} data-testid="timer" onChange={(time: string) => handleInputChange('eventTime', [time])} />
          </DialogItem>
        </div>
        <UpdateEventVenue handleVenueChange={handleVenueChange} formData={formData} />
        <Button className="w-full" onClick={handleUpdateEvent} data-testid="UpdateEvent">
          Шинэчлэх
        </Button>
      </DialogContent>
    </Dialog>
  );
};
