import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUpcomingBookingsQuery } from '@/generated';

import { ChevronDown, ChevronUp } from 'lucide-react';

export const UpcomingBookings = () => {
  const { data } = useUpcomingBookingsQuery();

  console.log('upcoming booking ', data);

  return (
    <div className="p-6 max-w-[784px] w-full rounded-[8px] border bg-background ">
      <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
      <Table className=" h-[400px] rounded-md border w-full ">
        <TableHeader className="border-1">
          <TableRow>
            <TableHead className="border-r-[1px] font-bold ">ID</TableHead>
            <TableHead className="border-r-[1px] font-bold ">Guest</TableHead>

            <TableHead className="border-r-[1px] font-bold ">
              <div className="flex items-center justify-between">
                Date
                <Button variant="ghost" size="icon" className="flex flex-col px-1 h-6 w-6">
                  <ChevronUp className="w-3 h-3" />
                  <ChevronDown className="w-3 h-3 -mt-1" />
                </Button>
              </div>
            </TableHead>

            <TableHead className="border-r-[1px]">
              <div className="flex items-center justify-between font-bold">
                Rooms
                <Button variant="ghost" size="icon" className="flex flex-col px-1 h-6 w-6">
                  <ChevronUp className="w-3 h-3" />
                  <ChevronDown className="w-3 h-3 -mt-1" />
                </Button>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array(6)
            .fill(null)
            .map((_, idx) => (
              <TableRow key={idx}>
                <TableCell className="border-r-[1px]">0001</TableCell>
                <TableCell className="border-r-[1px]">
                  <div className="font-medium text-sm">Shagai Nyamdorj</div>
                  <div className="text-sm text-muted-foreground">(1 adult, 0 children)</div>
                </TableCell>
                <TableCell className="text-sm border-r-[1px]">
                  Oct 20 – Oct 21 <span className="text-muted-foreground">(1 night)</span>
                </TableCell>
                <TableCell className="text-sm ">Economy Double Room, City View (301)</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
