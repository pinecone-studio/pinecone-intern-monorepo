/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input';
import { DialogItem } from './DialogItem';
import { Venue } from '@/generated';
type LocalVenue = Omit<Venue, '__typename'>;

interface VenuesProps {
  handleVenueChange: <T extends keyof LocalVenue>(_index: number, _field: T, _value: LocalVenue[T]) => void;
  formData: { venues: LocalVenue[] };
}
export const UpdateEventVenue = ({ formData, handleVenueChange }: VenuesProps) => {
  return (
    <>
      <div className="flex w-full gap-2">
        <DialogItem htmlFor="Энгийн" name="Энгийн">
          <Input
            type="number"
            placeholder="Нийт тоо хэмжээ"
            value={formData.venues[0]?.firstquantity}
            onChange={(e) => handleVenueChange(0, 'firstquantity', Number(e.target.value))}
            data-testid="RegularQuantity"
          />
        </DialogItem>
        <DialogItem htmlFor="ЭнгийнPrice" withLabel={false}>
          <Input type="number" placeholder="Үнэ" value={formData.venues[0]?.price} onChange={(e) => handleVenueChange(0, 'price', Number(e.target.value))} data-testid="RegularPrice" />
        </DialogItem>
      </div>
      <div className="flex w-full gap-2">
        <DialogItem htmlFor="Fan-Zone" name="Fan-Zone">
          <Input
            type="number"
            placeholder="Нийт тоо хэмжээ"
            value={formData.venues[1]?.firstquantity}
            onChange={(e) => handleVenueChange(1, 'firstquantity', Number(e.target.value))}
            data-testid={`FanZoneQuantity-regular`}
          />
        </DialogItem>
        <DialogItem htmlFor="Fan-ZonePrice" withLabel={false}>
          <Input type="number" placeholder="Үнэ" value={formData.venues[1]?.price} onChange={(e) => handleVenueChange(1, 'price', Number(e.target.value))} data-testid={`FanZonePrice-regular`} />
        </DialogItem>
      </div>
      <div className="flex w-full gap-2">
        <DialogItem htmlFor="Vip" name="Vip">
          <Input
            type="number"
            placeholder="Нийт тоо хэмжээ"
            value={formData.venues[2]?.firstquantity}
            onChange={(e) => handleVenueChange(2, 'firstquantity', Number(e.target.value))}
            data-testid={`VipQuantity-Regular`}
          />
        </DialogItem>
        <DialogItem htmlFor="VipPrice" withLabel={false}>
          <Input type="number" placeholder="Үнэ" value={formData.venues[2]?.price} onChange={(e) => handleVenueChange(2, 'price', Number(e.target.value))} data-testid={`VipPrice-Regular`} />
        </DialogItem>
      </div>
    </>
  );
};
