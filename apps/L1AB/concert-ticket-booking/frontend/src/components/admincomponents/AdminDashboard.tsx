/* eslint-disable complexity */
'use client';

import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UpdateEventComponent } from './UpdateEventComponent';
import { AdminPagination } from './AdminDashPagination';
import { useGetAllEventsQuery } from '@/generated';
import { AdvertisedEvent } from './AdvertisedEvent';
import { IoStar } from 'react-icons/io5';
import { DeletedEvent } from './DeleteEventButton';

type AdminDashboardComponent = {
  searchValue: string;
  selectedValues: string[];
  date: Date | undefined;
  eventStatus: string;
};
export const AdminDashboard = ({ searchValue, selectedValues, date, eventStatus }: AdminDashboardComponent) => {
  const { data, loading } = useGetAllEventsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
  const filteredData = data?.getAllEvents?.filter((item) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const lowerCasedate = date;
    const lowerCaseSelectedValues = selectedValues.map((value) => value.toLowerCase());
    if (lowerCasedate) {
      return item.eventDate.some((eventtime) => {
        const eventDate = new Date(eventtime);
        return eventDate.getDate() === lowerCasedate.getDate() && eventDate.getMonth() === lowerCasedate.getMonth() && eventDate.getFullYear() === lowerCasedate.getFullYear();
      });
    }
    if (lowerCaseSelectedValues.length > 0) {
      return item.artistName.some((artist) => lowerCaseSelectedValues.includes(artist.toLowerCase()));
    }
    if (lowerCaseSearchValue) {
      return item.name.toLowerCase().includes(lowerCaseSearchValue);
    }
    if (eventStatus) {
      return item.status?.toLowerCase() === eventStatus.toLowerCase();
    }
    return true;
  });

  const filterDeletedEvents = filteredData?.filter((event) => event.status === 'Онцлох' || event.status === 'Regular');

  const sortedEvents = filterDeletedEvents?.sort((a, b) => {
    if (a.status === 'Онцлох' && b.status !== 'Онцлох') {
      return -1;
    }
    if (b.status === 'Онцлох' && a.status !== 'Онцлох') {
      return 1;
    }
    return 0;
  });
  const totalPages = sortedEvents && sortedEvents.length > 0 ? Math.ceil(sortedEvents.length / itemsPerPage) : 0;
  const currentPageData = sortedEvents?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
              {currentPageData?.length ? (
                currentPageData?.map((item, index) => (
                  <TableRow key={index} data-testid={`get-events-${index}`}>
                    <TableCell align="center" className="font-medium">
                      {item.status === 'Онцлох' && <IoStar />}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.artistName.slice(0, 2).join(', ')}</TableCell>
                    <TableCell align="center" className="font-medium">
                      {item.venues[0].quantity + item.venues[1].quantity + item.venues[2].quantity}/{item.venues[0].firstquantity + item.venues[1].firstquantity + item.venues[2].firstquantity}
                    </TableCell>
                    <TableCell align="center" className="font-medium">
                      {item.venues[0].quantity}/{item.venues[0].firstquantity}
                    </TableCell>
                    <TableCell align="center">
                      {item.venues[1].quantity}/{item.venues[1].firstquantity}
                    </TableCell>
                    <TableCell align="center">
                      {item.venues[2].quantity}/{item.venues[2].firstquantity}
                    </TableCell>
                    <TableCell className="flex flex-col">
                      {item.eventDate.map((date, index) => (
                        <span key={index} className="flex">
                          {date}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell align="left">
                      {(
                        (item.venues[0].firstquantity - item.venues[0].quantity) * item.venues[0].price +
                        (item.venues[1].firstquantity - item.venues[1].quantity) * item.venues[1].price +
                        (item.venues[2].firstquantity - item.venues[2].quantity) * item.venues[2].price
                      ).toLocaleString()}
                      ₮
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <AdvertisedEvent eventId={item._id} />
                        <UpdateEventComponent eventId={item._id} />
                        <DeletedEvent eventId={item._id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <p className="text-[#A1A1AA] text-2xl">Хайлт тохирох үр дүн олдсонгүй.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
