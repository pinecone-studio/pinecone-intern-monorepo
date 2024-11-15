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

function createData(eventName: string, bankAccount: string, userName: string, sumPrice: number, createdAt: string, status: string) {
  return { eventName, bankAccount, userName, sumPrice, createdAt, status };
}

const rows = [
  createData('Хайртай аав', 'Голомт: 21342242294', 'И.Алтангэрэл', 182000, '2024-10-01T10:00:00Z', 'шилжүүлсэн'),
  createData('Үүрд мөнх', 'Голомт: 21342242294', 'Ч.Сүрэнхорлоо', 220000, '2024-10-02T10:00:00Z', 'дуусгах'),
  createData('Only you', 'Голомт: 21342242294', 'Л.Амаржаргал', 154600, '2024-10-03T10:00:00Z', 'дуусгах'),
  createData('Чамайг хүлээнэ', 'Голомт: 21342242294', 'Ч.Солонго', 102000, '2024-10-04T10:00:00Z', 'шилжүүлсэн'),
  createData('Эх орон', 'Голомт: 21342242294', 'Э.Биндэръяа', 286000, '2024-10-05T10:00:00Z', 'шилжүүлсэн'),
];
export const CancelComponent = () => {
  return (
    <div className="flex flex-col gap-6 mt-9">
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
              {rows.map((row) => (
                <TableRow key={row.eventName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" className="text-[#09090B] text-[16px] font-semibold">
                    {row.eventName}
                  </TableCell>
                  <TableCell align="center">{row.bankAccount}</TableCell>
                  <TableCell align="center" className="font-medium">
                    {row.userName}
                  </TableCell>
                  <TableCell align="center" className="font-medium">
                    {row.sumPrice.toLocaleString()}₮
                  </TableCell>
                  <TableCell align="center">{row.createdAt.slice(5, 10)}</TableCell>
                  <TableCell align="center">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div
                          className={`w-fit h-fit ${
                            row.status === 'шилжүүлсэн'
                              ? 'bg-[#F4F4F5] px-[10px] py-[2px] rounded-lg font-semibold text-xs'
                              : 'bg-[#FFFFFF] text-[14px] py-2 font-medium rounded-lg  px-3 border cursor-pointer'
                          }`}
                        >
                          {row.status}
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#FAFAFA]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Төлөв өөрчлөх</AlertDialogTitle>
                          <AlertDialogDescription>{row.userName} харилцагчийн төлбөрийн буцаалтын шилжүүлсэн үү</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Шилжүүлээгүй</AlertDialogCancel>
                          <AlertDialogAction>Шилжүүлсэн</AlertDialogAction>
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
