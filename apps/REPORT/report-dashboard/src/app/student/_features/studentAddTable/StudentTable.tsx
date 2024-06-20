import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropDownStudent } from './DropDownStudent';
import { Student } from '@/generated';
import Image from 'next/image';

export const StudentsTable = ({ studentsData }: { studentsData: Student[] }) => {
  console.log(studentsData);
  return (
    <Table className="container mx-auto border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Сурагчийн Нэр </TableHead>
          <TableHead>Код</TableHead>
          <TableHead>Цахим хаяг</TableHead>
          <TableHead>Утасны дугаар</TableHead>
          <TableHead className="text-right w-[100px]">Төлөв </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[70px]">
        {studentsData?.map((student, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2 w-[200px] h-[64px]">
              <Image className="w-[30px] h-[30px]  rounded-full" src={student.profileImgUrl} alt="student" />
              <h1>{student.firstName}</h1>
            </TableCell>
            <TableCell>{student.studentCode}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.phoneNumber}</TableCell>
            <TableCell className="font-medium flex items-center gap-2 h-[64px]  text-right">
              <div className="border rounded-md px-2 py-1 w-[90px] flex justify-center items-center">{student.active}</div>
              <DropDownStudent />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
