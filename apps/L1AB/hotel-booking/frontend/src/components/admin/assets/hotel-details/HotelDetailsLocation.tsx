import { LocationDialog } from '../../dialogs';

type HotelDetailsLocationProps = {
  location?: string;
};
export const HotelDetailsLocation = ({ location }: HotelDetailsLocationProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Location</h3>
        <LocationDialog location={location} />
      </div>
      <p>{location ? location : '-/-'}</p>
    </div>
  );
};
