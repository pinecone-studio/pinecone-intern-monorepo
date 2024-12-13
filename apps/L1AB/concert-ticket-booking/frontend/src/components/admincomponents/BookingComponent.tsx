'use client';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetAllBookingQuery } from '@/generated';

const statusBar = ['Баталгаажаагүй', 'Төлбөр хүлээгдэж буй', 'Баталгаажсан', 'Цуцлах хүсэлт илгээсэн', 'Цуцлагдсан', 'Бүх захиалгыг харах'];

export const BookingComponent = () => {
  const { data } = useGetAllBookingQuery();
  const [selectedStatus, setSelectedStatus] = useState('Баталгаажсан');

  const filteredData = selectedStatus === 'Бүх захиалгыг харах' ? data?.getAllBooking : data?.getAllBooking.filter((booking) => booking.status === selectedStatus);

  return (
    <div data-cy="Cancel-Component" className="cancel-component flex flex-col gap-6 mt-9">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[#09090B] text-lg font-medium text-center">Захиалгууд</div>
          <div className="text-[14px] text-[#71717A]">Ирсэн нийт захиалгууд</div>
        </div>
        <div className="flex gap-5">
          {statusBar.map((item, index) => (
            <div key={index} data-testid={`getSelect-${index}`} className={`cursor-pointer border ${selectedStatus === item ? 'border-b-2 border-blue-500' : ''} pb-1`} onClick={() => setSelectedStatus(item)}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="border"></div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-[#71717A] text-[14px]">Тоглолтын нэр</TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Захиалгын ID дугаар
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Үйлчлүүлэгч
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Огноо
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Төлбөр
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Төлөв
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((item, index) => (
                <TableRow data-testid={`getCancel-${index}`} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" className="text-[#09090B] text-[16px] font-semibold">
                    {item.eventId.name}
                  </TableCell>
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center" className="font-medium flex flex-col">
                    <div>{item.userId.name}</div>
                    <div>{item.email}</div>
                  </TableCell>
                  <TableCell align="center" className="font-medium">
                    {new Date(item.createdAt).toISOString().slice(0, 16).replace('T', ' ')}
                  </TableCell>
                  <TableCell align="center">{item.amountTotal ? item.amountTotal.toLocaleString() + '₮' : '0₮'}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
