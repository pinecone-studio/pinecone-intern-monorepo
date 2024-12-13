'use client';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useGetAllBookingQuery, useUpdateBookingMutation } from '@/generated';

export const CancelComponent = () => {
  const { data } = useGetAllBookingQuery();
  const [updateCancel] = useUpdateBookingMutation();
  const filteredData = data?.getAllBooking.filter((booking) => booking.status === 'Цуцлах хүсэлт илгээсэн' || booking.status === 'Цуцлагдсан');
  console.log(data);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    await updateCancel({
      variables: {
        input: { _id: bookingId, status },
      },
    });
  };

  return (
    <div data-cy="Cancel-Component" className="cancel-component flex flex-col gap-6 mt-9">
      <div className="flex flex-col items-start">
        <div className="text-[#09090B] text-lg font-medium text-center">Хүсэлтүүд</div>
        <div className="text-[14px] text-[#71717A]">Ирсэн цуцлах хүсэлтүүд</div>
      </div>
      <div className="border"></div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-[#71717A] text-[14px]">Тоглолтын нэр</TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Дансны мэдээлэл
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Эзэмшигчийн нэр
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Шилжүүлэх дүн
                </TableCell>
                <TableCell align="center" className="text-[#71717A] text-[14px]">
                  Хүсэлт ирсэн огноо
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
                  <TableCell align="center">
                    {item.bankName}:{item.bankAccount}
                  </TableCell>
                  <TableCell align="center" className="font-medium">
                    {item.userId.name}
                  </TableCell>
                  <TableCell align="center" className="font-medium">
                    {item.amountTotal ? item.amountTotal.toLocaleString() + '₮' : '0₮'}
                  </TableCell>
                  <TableCell align="center">{item.createdAt.slice(5, 10)}</TableCell>
                  <TableCell align="center">
                    <AlertDialog>
                      <AlertDialogTrigger data-testid={`click1-${index}`}>
                        <div
                          className={`w-fit h-fit  ${
                            item.status === 'Цуцлагдсан'
                              ? 'bg-[#b1b1b1] px-[10px] py-[2px] rounded-lg font-semibold text-xs'
                              : 'bg-[#FFFFFF] text-[14px] py-2 font-medium rounded-lg  px-3 border cursor-pointer'
                          }`}
                        >
                          {item.status}
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#FAFAFA]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Төлөв өөрчлөх</AlertDialogTitle>
                          <AlertDialogDescription>{item.userId.name} Харилцагчийн төлбөрийн буцаалтын шилжүүлсэн үү</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => handleUpdateStatus(item._id, 'Цуцлах хүсэлт илгээсэн')} data-testid="cancelButton">
                            Шилжүүлээгүй
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleUpdateStatus(item._id, 'Цуцлагдсан')} data-testid="actionButton">
                            Шилжүүлсэн
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
