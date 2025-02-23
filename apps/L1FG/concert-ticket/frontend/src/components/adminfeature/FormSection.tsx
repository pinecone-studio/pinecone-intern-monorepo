import { BasicInputFieldProps, FormData, TicketSectionProps } from './concert-type';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ImageUploadWithPreview from '@/app/_features/adminFeature/ImageUrlPreview';
import { DatePicker } from './RangeDatePicker';
import { TimeSelector } from './TimeSelector';
import { Button } from '@/components/ui/button';
import { useConcertForm } from '../admincontext/DialogContext';

interface FormSectionProps {
  formData: FormData;
  errors: Record<string, string>;
}
export const FormSection = ({ formData, errors }: FormSectionProps) => {
  const { addArtist, handleArtistChange, handleChange, removeArtist, handleDatesSelect } = useConcertForm();

  return (
    <div className="grid gap-4 pt-1">
      <BasicInputField id="concertName" name="concertName" label="Тоглолтын нэр" placeholder="Нэр оруулах" value={formData.concertName} onChange={handleChange} error={errors.concertName} />
      <div>
        <ImageUploadWithPreview name="concertPhoto" value={formData.concertPhoto} onChange={handleChange} />
        {errors.concertPhoto && <p className="text-red-500 text-sm">{errors.concertPhoto}</p>}
      </div>
      <BasicInputField
        id="concertPlan"
        name="concertPlan"
        label="Хөтөлбөрийн тухай"
        placeholder="Дэлгэрэнгүй мэдээлэл"
        value={formData.concertPlan}
        onChange={handleChange}
        error={errors.concertPlan}
      />
      <div className="flex flex-col items-start gap-2">
        <Label role="artistName" htmlFor="artistName" className="text-right">
          Үндсэн артистын нэр
        </Label>
        {formData.artistName.map((artist, index) => (
          <div key={index} className="flex w-full gap-2">
            <Input
              data-testId="artistName"
              role="artistName"
              id={`artistName-${index}`}
              placeholder="Артистын нэр"
              value={artist}
              onChange={(e) => handleArtistChange(index, e.target.value)}
              className={`col-span-3 pt-1 pb-1 pr-3 pl-3 ${index === 0 && errors.artistName ? 'border-red-500' : ''}`}
            />
            {index > 0 && (
              <Button type="button" onClick={() => removeArtist(index)} className="bg-red-500 hover:bg-red-600 text-white px-3">
                ×
              </Button>
            )}
          </div>
        ))}
        {errors.artistName && <p className="text-red-500 text-sm">{errors.artistName}</p>}
        <Button type="button" onClick={addArtist} className="bg-white text-black border hover:bg-slate-300">
          Бусад артист нэмэх +
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <div>
          <Label htmlFor="concertDay" className="text-right">
            Тоглолтын өдөр сонгох
          </Label>
          <DatePicker selectedDates={[formData.concertDay]} onDatesSelect={handleDatesSelect} />
          {errors.concertDay && <p className="text-red-500 text-sm">{errors.concertDay}</p>}
        </div>
        <div>
          <TimeSelector value={formData.concertTime} onChange={(newTime) => handleChange({ target: { name: 'concertTime', value: newTime } } as React.ChangeEvent<HTMLInputElement>)} />
          {errors.concertTime && <p className="text-red-500 text-sm">{errors.concertTime}</p>}
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
  );
};

const BasicInputField = ({ id, name, label, placeholder, value, onChange, error }: BasicInputFieldProps) => (
  <div className="flex flex-col items-start gap-2">
    <Label htmlFor={id} className="text-right">
      {label}
    </Label>
    <Input id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} className={`col-span-3 ${error ? 'border-red-500' : ''}`} />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
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
      data-testid={`${testId}quantity`}
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
      data-testid={`${testId}price`}
    />
    {priceError && <p className="text-red-500 text-sm">{priceError}</p>}
  </div>
);
