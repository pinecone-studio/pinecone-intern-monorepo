/* eslint-disable complexity */
'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UpdateEventComponent } from './UpdateEventComponent';
import { DeletedEvent } from './DeleteEventButton';
import { useGetAllEventsQuery } from '@/generated';

export const Demo = () => {
  const { data, loading } = useGetAllEventsQuery();

  const headers: { label: string; align: 'center' | 'left' | 'right' | 'inherit' | 'justify' }[] = [
    { label: '', align: 'center' },
    { label: 'Тоглолтын нэр', align: 'left' },
    { label: 'Артист', align: 'center' },
    { label: 'Нийт тоо', align: 'center' },
    { label: 'Энгийн', align: 'center' },
    { label: 'FanZone', align: 'center' },
    { label: 'VIP', align: 'center' },
    { label: 'Тоглох өдрүүд', align: 'left' },
    { label: 'Нийт орлого', align: 'right' },
    { label: 'Үйлдэл', align: 'center' },
  ];

  if (loading) return <div>Loading...</div>;

  const currentPageData = data?.getAllEvents?.filter((event) => event.status === 'Demo');

  return (
    <div className="flex flex-col gap-6 mt-9">
      <div className="border"></div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow className="text-[#71717A] text-[14px]" data-testid={`get-rows`}>
                {headers.map((header, index) => (
                  <TableCell key={index} align={header.align}>
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {currentPageData?.map((item, index) => (
                <TableRow key={index} data-testid={`get-demo-${index}`}>
                  <TableCell align="center" className="font-medium"></TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.artistName?.[0]}</TableCell>
                  <TableCell align="center" className="font-medium">
                    {item.venues?.[0]?.quantity + item.venues?.[1]?.quantity + item.venues?.[2]?.quantity}/
                    {item.venues?.[0]?.firstquantity + item.venues?.[1]?.firstquantity + item.venues?.[2]?.firstquantity}
                  </TableCell>
                  <TableCell align="center" className="font-medium">
                    {item.venues?.[0]?.quantity}/{item.venues?.[0]?.firstquantity}
                  </TableCell>
                  <TableCell align="center">
                    {item.venues?.[1]?.quantity}/{item.venues?.[1]?.firstquantity}
                  </TableCell>
                  <TableCell align="center">
                    {item.venues?.[2]?.quantity}/{item.venues?.[2]?.firstquantity}
                  </TableCell>
                  <TableCell className="flex flex-col">
                    {item.eventDate?.map((date, index) => (
                      <span key={index} className="flex">
                        {date}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {(
                      (item.venues?.[0]?.firstquantity - item.venues?.[0]?.quantity) * item.venues?.[0]?.price +
                      (item.venues?.[1]?.firstquantity - item.venues?.[1]?.quantity) * item.venues?.[1]?.price +
                      (item.venues?.[2]?.firstquantity - item.venues?.[2]?.quantity) * item.venues?.[2]?.price
                    ).toLocaleString()}
                    ₮
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <UpdateEventComponent eventId={item._id} />
                      <DeletedEvent eventId={item._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
