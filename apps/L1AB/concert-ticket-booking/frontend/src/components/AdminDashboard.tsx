"use client"
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TrashIcon } from 'lucide-react';
import { UpdateEventComponent } from './UpdateEventComponent';
import { AdminPagination } from './AdminDashPagination';
import { useGetAllEventsQuery } from '@/generated';

export const AdminDashboard = () => {
  const {data}= useGetAllEventsQuery (); 
  return (
    <div className="flex flex-col gap-6 mt-9">
      <div className="border"></div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-[#71717A] text-[14px] "> Тоглолтын нэр</TableCell>

                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Артист
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Нийт тоо
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  VIP
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Regular
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Задгай
                </TableCell>
                <TableCell className="text-[#71717A] text-[14px]">Тоглох өдрүүд</TableCell>
                <TableCell align="right" className="text-[#71717A] text-[14px]">
                  Нийт ашиг
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Үйлдэл
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getAllEvents.map((item,index) => (
                <TableRow key={index} data-testid={`get-events-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" className="text-[#09090B] text-[16px] font-semibold">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.artistName}</TableCell>
                  <TableCell align="center" className="font-medium">
                    {item.venues[0].quantity}
                  </TableCell>     
                  <TableCell align="center" className="font-medium">
                    {item.venues[1].quantity}
                  </TableCell>
                  <TableCell align="center">{item.venues[2].quantity}</TableCell>
                  <TableCell align="center">{item.venues[2].quantity}</TableCell>
                  <TableCell>{item.eventDate}</TableCell>
                  <TableCell align="center">{item.venues[2].price}₮</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <UpdateEventComponent />
                    <button>
                      {' '}
                      <TrashIcon className="bg-[#F4F4F5]  rounded p-1" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
      </div>
      <AdminPagination/>
    </div>
  );
};
