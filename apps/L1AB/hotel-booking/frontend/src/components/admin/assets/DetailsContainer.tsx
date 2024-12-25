'use client';

import { useAdmin } from '@/components/providers/AdminProvider';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type DetailsContainerProps = {
  name: string;
} & PropsWithChildren;
export const DetailsContainer = ({ children, name }: DetailsContainerProps) => {
  const pathname = usePathname();
  const { addHotelForm, addRoomForm } = useAdmin();
  const pathnames = (pathname || '').split('/').filter((path) => path);
  return (
    <div data-testid="DetailsContainer" className="max-w-screen-xl m-auto">
      <form onSubmit={pathnames.length === 3 ? addHotelForm.handleSubmit : addRoomForm.handleSubmit}>
        <div className="py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <Link href={'/' + pathnames.slice(0, -1).join('/')}>
              <div className="bg-white w-8 h-8 text-black flex justify-center items-center rounded-md shadow-sm border hover:bg-gray-50">
                <ChevronLeft />
              </div>
            </Link>
            <span data-testid={`hotel-${name}`} className="text-lg font-semibold">
              {name}
            </span>
          </div>
          <div>{saveButton(pathnames, addHotelForm, addRoomForm)}</div>
        </div>
        <div className="flex w-full gap-4 mb-4">{children}</div>
      </form>
    </div>
  );
};
const saveButton = (pathnames: string[], addHotelForm: any, addRoomForm: any) => {
  if (pathnames.length === 3) {
    return getHotelSaveButton(addHotelForm);
  } else if (pathnames.length === 4) {
    return getRoomSaveButton(addRoomForm);
  }
  return null;
};

const getHotelSaveButton = (addHotelForm: any) => {
  return (
    <Button data-testid="save-button" variant="outline" type="submit" className={`bg-blue-600 hover:opacity-50 text-white`} disabled={!addHotelForm.isValid || !addHotelForm.dirty}>
      Save
    </Button>
  );
};

const getRoomSaveButton = (addRoomForm: any) => {
  return (
    <Button data-testid="save-button" variant="outline" type="submit" className={`bg-blue-600 hover:opacity-50 text-white`} disabled={!addRoomForm.isValid || !addRoomForm.dirty}>
      Save
    </Button>
  );
};