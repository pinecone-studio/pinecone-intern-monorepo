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

function createData(eventName: string, artist: string, quantity: string, Vip: string, reguler: string, fanzone: string, startdate: string, sumprice: string) {
  return { eventName, artist, quantity, Vip, reguler, startdate, fanzone, sumprice };
}

const rows = [
  createData('Хайртай аав', 'Davaidasha', '234/300', '234/300', '234/300', '234/300', '4/10', '316’000’000'),
  createData('Үүрд мөнх', 'Болдбаатар', '234/300', '234/300', '234/300', '234/300', '4/10', '316’000’000'),
  createData('Only you', 'Sally', '234/300', '234/300', '234/300', '234/300', '10/23, 10/24, 10/25', '316’000’000'),
  createData('Чамайг хүлээнэ', 'Ариунаа', '234/300', '234/300', '234/300', '234/300', '4/10', '316’000’000'),
  createData('Эх орон', 'Хурд', '234/300', '234/300', '234/300', '234/300', '10/23, 10/24, 10/25', '316’000’000'),
];
export const AdminDashboard = () => {
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
              {rows.map((row) => (
                <TableRow key={row.eventName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" className="text-[#09090B] text-[16px] font-semibold">
                    {row.eventName}
                  </TableCell>
                  <TableCell align="center">{row.artist}</TableCell>
                  <TableCell align="center" className="font-medium">
                    {row.quantity}
                  </TableCell>
                  <TableCell align="center" className="font-medium">
                    {row.Vip}
                  </TableCell>
                  <TableCell align="center">{row.reguler}</TableCell>
                  <TableCell align="center">{row.fanzone}</TableCell>
                  <TableCell>{row.startdate}</TableCell>
                  <TableCell align="center">{row.sumprice}₮</TableCell>
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
    </div>
  );
};
