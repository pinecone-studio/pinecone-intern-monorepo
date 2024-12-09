import { useAdmin } from '@/components/providers/AdminProvider';
import { LocationDialog } from '../../dialogs';

export const HotelDetailsLocation = () => {
  const { addHotelForm } = useAdmin();
  return (
    <div data-testid="HotelDetailsLocation" className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Location</h3>
        <LocationDialog />
      </div>
      <p>{addHotelForm.values.address || '-/-'}</p>
    </div>
  );
};
