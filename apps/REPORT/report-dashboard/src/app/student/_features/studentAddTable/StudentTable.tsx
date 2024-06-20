import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropDownStudent } from './DropDownStudent';
import { Student } from '@/generated';

export const StudentsTable = ({ studentsData }: { studentsData: Student[] }) => {
  console.log(studentsData);
  return (
    <Table className="container mx-auto border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead data-testid="student-name" className="w-[150px]">
            Сурагчийн Нэр
          </TableHead>
          <TableHead data-testid="student-code">Код</TableHead>
          <TableHead data-testid="student-email">Цахим хаяг</TableHead>
          <TableHead data-testid="student-phone-number">Утасны дугаар</TableHead>
          <TableHead data-testid="stundet-state" className="text-right w-[100px]">
            Төлөв
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[70px]">
        {studentsData?.map((student, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2 w-[200px] h-[64px]">
              <img className="h-[40px] w-[40px] rounded-full" src={student.profileImgUrl} alt="student" />
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
