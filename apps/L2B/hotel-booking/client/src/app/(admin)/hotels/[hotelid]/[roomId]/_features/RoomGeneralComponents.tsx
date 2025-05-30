'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RoomFormData } from '@/utils/type';
import { RoomType } from '@/generated';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
interface InformationInputProps {
  information: string[];
  setInformation: (_info: string[]) => void;
}
export const InformationInput = ({ information, setInformation }: InformationInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleAdd = () => {
    const value = inputValue.trim();
    if (value && !information.includes(value)) {
      setInformation([...information, value]);
      setInputValue('');
    }
  };
  const handleRemove = (info: string) => {
    setInformation(information.filter((i) => i !== info));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
    else if (e.key === 'Backspace' && !inputValue && information.length) {
      handleRemove(information[information.length - 1]);
    }
  };

  return (
    <div data-testid="information-input">
      <Label>Room Information</Label>
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-10">
        {information.map((info) => (
          <Badge key={info} variant="secondary" className="flex items-center gap-1 pr-1.5" data-testid={`info-badge-${info}`}>
            {info}
            <button onClick={() => handleRemove(info)} className="rounded-full hover:bg-gray-300 p-0.5" data-testid={`remove-info-${info}`} aria-label={`Remove ${info}`}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={information.length ? '' : 'e.g. 18 sq m, Private bathroom...'}
          className="flex-1 min-w-[100px] focus-visible:ring-0 bg-transparent border-none"
          data-testid="info-input"
          aria-label="Room information input"
        />
      </div>
    </div>
  );
};

interface RoomFormProps {
  formData: RoomFormData;
  setFormData: (_data: RoomFormData) => void;
  information: string[];
  setInformation: (_info: string[]) => void;
  onSave: () => void;
  loading: boolean;
}

export const RoomGeneralInfoForm = ({ formData, setFormData, information, setInformation, onSave, loading }: RoomFormProps) => {
  console.log('types:', formData.type);
  return (
    <DialogContent className="sm:min-w-[40rem]" data-cy="room-general-info-form" data-testid="room-general-info-form">
      <DialogHeader>
        <DialogTitle className="font-semibold text-base">General Info</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {(['name', 'pricePerNight', 'roomNumber'] as const).map((field) => (
            <div key={field}>
              <Label>{field.replace(/([A-Z])/g, ' $1')}</Label>
              <Input
                className="focus-visible:ring-0"
                type={field === 'name' ? 'text' : 'number'}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field]: field === 'pricePerNight' || field === 'roomNumber' ? Number(e.target.value) : e.target.value,
                  })
                }
                data-testid={`input-${field}`}
                aria-label={field}
              />
            </div>
          ))}
          <div>
            <Label>Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as RoomType })} data-testid="select-type">
              <SelectTrigger data-testid="select-type-trigger">
                <SelectValue placeholder="Select type" data-testid="select-type-value" />
              </SelectTrigger>
              <SelectContent data-testid="select-type-content">
                {Object.values(RoomType).map((type) => (
                  <SelectItem key={type} value={type} data-testid={`select-item-${type}`} aria-label={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <InformationInput information={information} setInformation={setInformation} />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isAvailable}
            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            data-testid="checkbox-available"
            aria-label="Available checkbox"
          />
          <Label>Available</Label>
        </div>

        <div className="flex justify-between mt-4">
          <DialogClose asChild>
            <Button variant="ghost" data-testid="button-close">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700" data-testid="button-save" aria-label={loading ? 'Saving...' : 'Save'}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
