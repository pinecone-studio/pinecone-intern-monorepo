/*eslint-disable*/
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { DatePicker } from '@/components/adminfeature/RangeDatePicker';
import { TimeSelector } from '@/components/adminfeature/TimeSelector';
import { ToastContainer } from 'react-toastify';
import { EditFormProvider, useEditForm } from '@/app/_features/adminFeature/EditFormContext';

interface TicketSectionProps {
  label: string;
  quantityName: string;
  priceName: string;
  quantityValue: number;
  priceValue: number;
  quantityError?: string;
  priceError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId: string;
}

const TicketSection = ({ label, quantityName, priceName, quantityValue, priceValue, quantityError, priceError, onChange, testId }: TicketSectionProps) => (
  <div className="flex flex-col gap-2 items-start">
    <Label htmlFor={`${testId}quantity`} className="text-right">
      {label}
    </Label>
    <Input
      id={`${testId}quantity`}
      name={quantityName}
      placeholder="Нийт тоо хэмжээ"
      type="number"
      value={quantityValue}
      onChange={onChange}
      className={`col-span-3 pt-1 pb-1 pr-3 pl-3 ${quantityError ? 'border-red-500' : ''}`}
    />
    {quantityError && <p className="text-red-500 text-sm">{quantityError}</p>}
    <Input
      id={`${testId}price`}
      name={priceName}
      placeholder="Нэгжийн үнэ"
      type="number"
      value={priceValue}
      onChange={onChange}
      className={`col-span-3 pt-1 pb-1 pr-3 pl-3 ${priceError ? 'border-red-500' : ''}`}
    />
    {priceError && <p className="text-red-500 text-sm">{priceError}</p>}
  </div>
);

interface EditFormErrors {
  concertName?: string;
  concertPlan?: string;
  artistName?: string;
  'vipTicket.quantity'?: string;
  'vipTicket.price'?: string;
  'regularTicket.quantity'?: string;
  'regularTicket.price'?: string;
  'standingAreaTicket.quantity'?: string;
  'standingAreaTicket.price'?: string;
}

interface FormData {
  concertName: string;
  concertPlan: string;
  artistName: string[];
  concertDay: Date;
  concertTime: string;
  vipTicket: { quantity: number; price: number };
  regularTicket: { quantity: number; price: number };
  standingAreaTicket: { quantity: number; price: number };
}

const EditForm = ({ errors }: { errors: EditFormErrors }) => {
  const { formData, handleChange, addArtist, removeArtist, handleArtistChange, handleDatesSelect, handleSubmit } = useEditForm();

  return (
    <form onSubmit={handleSubmit} data-testid="edit-form">
      <DialogHeader>
        <DialogTitle>Тасалбар засах</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 pt-1">
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="concertName">Тоглолтын нэр</Label>
          <Input
            id="concertName"
            name="concertName"
            value={formData.concertName}
            onChange={handleChange}
            placeholder="Нэр оруулах"
            className={`col-span-3 ${errors.concertName ? 'border-red-500' : ''}`}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="concertPlan">Хөтөлбөрийн тухай</Label>
          <Input
            id="concertPlan"
            name="concertPlan"
            value={formData.concertPlan}
            onChange={handleChange}
            placeholder="Дэлгэрэнгүй мэдээлэл"
            className={`col-span-3 ${errors.concertPlan ? 'border-red-500' : ''}`}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label>Үндсэн артистын нэр</Label>
          {(formData.artistName || []).map((artist, index) => (
            <div key={index} className="flex w-full gap-2">
              <Input
                placeholder="Артистын нэр"
                value={artist || ''}
                onChange={(e) => handleArtistChange(index, e.target.value)}
                className={`col-span-3 ${index === 0 && errors.artistName ? 'border-red-500' : ''}`}
              />
              {index > 0 && (
                <Button type="button" onClick={() => removeArtist(index)} className="bg-red-500 hover:bg-red-600 text-white px-3">
                  ×
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addArtist} className="bg-white text-black border hover:bg-slate-300">
            Бусад артист нэмэх +
          </Button>
        </div>

        <div className="flex items-start gap-2">
          <div>
            <Label>Тоглолтын өдөр сонгох</Label>
            <DatePicker selectedDates={[formData.concertDay]} onDatesSelect={handleDatesSelect} />
          </div>
          <div>
            <TimeSelector
              value={formData.concertTime}
              onChange={(newTime) =>
                handleChange({
                  target: { name: 'concertTime', value: newTime },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TicketSection
            label="VIP"
            quantityName="vipTicket.quantity"
            priceName="vipTicket.price"
            quantityValue={formData.vipTicket.quantity}
            priceValue={formData.vipTicket.price}
            quantityError={errors['vipTicket.quantity']}
            priceError={errors['vipTicket.price']}
            onChange={handleChange}
            testId="vipticket"
          />
          <TicketSection
            label="Regular"
            quantityName="regularTicket.quantity"
            priceName="regularTicket.price"
            quantityValue={formData.regularTicket.quantity}
            priceValue={formData.regularTicket.price}
            quantityError={errors['regularTicket.quantity']}
            priceError={errors['regularTicket.price']}
            onChange={handleChange}
            testId="regularticket"
          />
          <TicketSection
            label="Задгай"
            quantityName="standingAreaTicket.quantity"
            priceName="standingAreaTicket.price"
            quantityValue={formData.standingAreaTicket.quantity}
            priceValue={formData.standingAreaTicket.price}
            quantityError={errors['standingAreaTicket.quantity']}
            priceError={errors['standingAreaTicket.price']}
            onChange={handleChange}
            testId="openfieldticket"
          />
        </div>
      </div>

      <DialogFooter>
        <div className="mt-2">
          <Button type="submit">Шинэчлэх</Button>
        </div>
      </DialogFooter>
    </form>
  );
};
interface EditFormData {
  _id?: string;
  concertName: string;
  concertPlan: string;
  artistName: string[];
  concertDay: Date;
  concertTime: string;
  vipTicket: { quantity: number; price: number };
  regularTicket: { quantity: number; price: number };
  standingAreaTicket: { quantity: number; price: number };
}

interface Concert {
  concertName: string;
  concertPlan: string;
  artistName: string[];
  concertDay: string;
  concertTime: string;
  vipTicket: { quantity: number; price: number };
  regularTicket: { quantity: number; price: number };
  standingAreaTicket: { quantity: number; price: number };
}

export const EditConcertDialog = ({ concert, onEdit }: { concert: Concert; onEdit: (data: EditFormData) => Promise<void> }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEditSubmit = async (formData: EditFormData): Promise<void> => {
    try {
      await onEdit(formData);
      setOpen(false);
    } catch (error) {
      console.error('Error editing concert:', error);
    }
  };

  const initialData = {
    concertName: concert.concertName,
    concertPlan: concert.concertPlan,
    artistName: (concert.artistName || []).filter((name): name is string => name !== null),
    concertDay: new Date(concert.concertDay),
    concertTime: concert.concertTime,
    vipTicket: concert.vipTicket,
    regularTicket: concert.regularTicket,
    standingAreaTicket: concert.standingAreaTicket,
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="p-1 bg-[#F4F4F6]">
            <Pencil className="text-black" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white h-screen overflow-y-scroll pt-5 pb-5 pr-5 pl-5">
          <EditFormProvider initialData={initialData} onSubmit={handleEditSubmit}>
            <EditForm errors={errors} />
          </EditFormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditConcertDialog;
