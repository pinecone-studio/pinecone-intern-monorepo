import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Chip } from './Chip';
import { DropDownStudent } from './DropDownStudent';
import { Student } from '@/generated';

export const StudentsTable = ({ studentsdata }: { studentsdata: Student[] }) => {
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
      <TableBody>
        {studentsdata?.map((student, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2 w-[200px]">
              <img className="w-[30px] h-[30px]  rounded-full" src={student.profileImgUrl} alt="student" />
              <h1>{student.firstName}</h1>
            </TableCell>
            <TableCell>{student.studentCode}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.phoneNumber}</TableCell>
            <TableCell className="font-medium flex items-center gap-2  text-right">
              <div>{student.active}</div>
              <DropDownStudent />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
