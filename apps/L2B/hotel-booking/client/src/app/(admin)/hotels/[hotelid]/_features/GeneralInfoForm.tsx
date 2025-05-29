'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useUpdateHotelMutation, Hotel } from '@/generated';
import { useEffect, useState } from 'react';
import { HotelForm } from '@/utils/type';

type GeneralInfoFormProps = {
  hotel: Hotel;
};

export const GeneralInfoForm = ({ hotel }: GeneralInfoFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getInitialForm = (): HotelForm => ({
    name: '',
    description: '',
    starRating: 0,
    phone: '',
    rating: 0,
  });

  const [form, setForm] = useState<HotelForm>(getInitialForm());

  useEffect(() => {
    if (!hotel) return;
    const { name = '', description = '', starRating = 0, phone = '', rating = 0 } = hotel;
    setForm({ name, description, starRating, phone, rating });
  }, [hotel]);

  const [updateHotel, { loading }] = useUpdateHotelMutation();

  const handleSave = async () => {
    try {
      await updateHotel({
        variables: {
          updateHotelId: hotel._id!,
          input: {
            name: form.name,
            description: form.description,
            starRating: form.starRating ?? null,
            phone: form.phone,
            rating: form.rating ?? null,
          },
        },
      });
      setIsOpen(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const formFields = [
    { label: 'Name', key: 'name', type: 'input' },
    { label: 'Description', key: 'description', type: 'textarea' },
    { label: 'Phone number', key: 'phone', type: 'input' },
    { label: 'Rating', key: 'rating', type: 'number' },
  ] as const;

  const renderField = ({ label, key, type }: typeof formFields[number]) => (
    <div key={key} className="flex flex-col gap-2">
      <Label>{label}</Label>
      {type === 'textarea' ? (
        <Textarea value={form[key] ?? ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
      ) : (
        <Input
          value={form[key] ?? ''}
          onChange={(e) =>
            setForm({
              ...form,
              [key]: type === 'number' ? Math.min(+e.target.value, 10) : e.target.value,
            })
          }
          type={type}
          {...(type === 'number' ? { max: 10 } : {})}
        />
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger data-testid="edit-general" className="px-4 flex items-center text-[#2563EB] text-sm font-medium">
        Edit
      </DialogTrigger>
      <DialogContent className="sm:min-w-[33rem]">
        <DialogHeader>
          <DialogTitle className="font-semibold text-base">General Info</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-5 w-full">
          {formFields.map(renderField)}
          <div className="flex flex-col gap-2">
            <Label>Star rating</Label>
            <Select value={form.starRating?.toString() ?? ''} onValueChange={(v) => setForm({ ...form, starRating: v ? +v : null })}>
              <SelectTrigger data-testid="star-rating-select" className="w-full focus-visible:ring-0">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem data-testid="star-item" key={num} value={num.toString()}>
                      {num} star{num !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
        <div className="w-full flex justify-between">
          <Button data-testid="close-star-dialog" type="button" variant="ghost" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-[#2563EB] hover:bg-[#2564ebeb]">
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
