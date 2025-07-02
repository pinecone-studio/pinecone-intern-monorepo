'use client';

import { Booking } from '@/generated';

type SortField = 'roomId' | 'roomId';

interface SortableHeaderProps {
  title: string;
  field: SortField;
}

const SortableHeader = ({ title }: SortableHeaderProps) => {
  return (
    <th className="text-left bg-white p-4 text-sm font-semibold text-black border border-gray-200">
      <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">{title}</button>
    </th>
  );
};

const generateIndexId = (index: number) => String(index + 1).padStart(4, '0');

export const GuestTable = ({ bookings }: { bookings: Booking[] }) => {
  const handleRowClick = (booking: Booking) => {
    window.location.href = `/hotels/${booking.hotelId?._id}/${booking.roomId._id}/${booking._id}`;
  };

  const formatDate = (date: string | Date, locale = 'en-US'): string => {
    const d = new Date(date);
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    }).format(d);
  };

  return (
    <div className="w-full overflow-auto bg-white" data-testid="guests-table">
      <table className="w-full border border-gray-200 border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray-200">
            <th className="text-left p-4 text-sm font-semibold text-black w-20 border border-gray-200">ID</th>
            <th className="text-left p-4 text-sm font-semibold text-black border border-gray-200">Name</th>
            <SortableHeader title="Hotel" field="roomId" />
            <SortableHeader title="Rooms" field="roomId" />
            <th className="text-left p-4 text-sm font-semibold text-black w-32 border border-gray-200">Guests</th>
            <th className="text-left p-4 text-sm font-semibold text-black w-32 border border-gray-200">Date</th>
            <SortableHeader title="Status" field="roomId" />
          </tr>
        </thead>
        <tbody data-testid="guests-table-body">
          {bookings?.map((bookings, index) => (
            <tr
              key={bookings._id}
              className="border-b h-[50px] border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick(bookings)}
              data-testid={`guests-row-${index}`}
            >
              <td className="pl-4 text-sm text-gray-600 border border-gray-200" data-testid={`guests-id-${index}`}>
                {generateIndexId(index)}
              </td>
              <td className="pl-4 text-sm text-gray-900  font-medium border border-gray-200" data-testid={`users-name-${index}`}>
                <div className="flex gap-1">
                  <p> {bookings?.userId.firstName}</p>
                  <p> {bookings?.userId.lastName}</p>
                </div>
              </td>
              <td className="pl-4 border border-gray-200" data-testid={`bookings-rooms-${index}`}>
                {bookings.hotelId?.name}
              </td>
              <td className="pl-4 border border-gray-200" data-testid={`room-name-${index}`}>
                {bookings.roomId?.name}
              </td>
              <td className="pl-4 text-sm text-gray-900  font-medium border border-gray-200" data-testid={`users-info-${index}`}>
                <p>{bookings?.guests?.adults} Adults</p>
              </td>
              <td className="pl-4 border border-gray-200 text-sm" data-testid={`bookings-dates-${index}`}>
                {formatDate(bookings.checkInDate)} - {formatDate(bookings.checkOutDate)}
              </td>
              <td
                className={`inline-block   ${bookings?.status === 'checked_in' ? 'bg-[#18BA51]' : bookings?.status === 'cancelled' ? 'bg-red-500' : 'bg-[#2563EB]'} 
                text-white font-semibold text-xs w-[64px] h-[30px] flex justify-center items-center mt-[10px] ml-5 rounded-full`}
                data-testid={`guests-status-${index}`}
              >
                {bookings.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
