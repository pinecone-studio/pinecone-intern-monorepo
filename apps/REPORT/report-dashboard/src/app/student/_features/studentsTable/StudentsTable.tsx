import { Student } from '@/generated';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StudentsTable = ({ studentsData }: { studentsData: Student[] }) => {
  return (
    <Table className="container mx-auto border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead data-cy="students-name" className="w-[150px]">
            Сурагчийн Нэр
          </TableHead>
          <TableHead data-cy="student-code">Код</TableHead>
          <TableHead data-cy="student-email">Цахим хаяг</TableHead>
          <TableHead data-cy="student-phone-number">Утасны дугаар</TableHead>
          <TableHead data-cy="stundet-state" className="text-right w-[100px]">
            Төлөв
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[70px]">
        {studentsData?.map((student, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2 w-[200px] h-[64px]">
              <img data-cy="student-profile" className="h-[40px] w-[40px] rounded-full" src={student.profileImgUrl} alt="student" />
              <h1 data-cy="students-name" className="font-medium">
                {student.firstName}
              </h1>
            </TableCell>
            <TableCell data-cy="student-code">{student.studentCode}</TableCell>
            <TableCell data-cy="student-email">{student.email}</TableCell>
            <TableCell data-cy="student-phone-number">{student.phoneNumber}</TableCell>
            <TableCell className="font-medium flex items-center gap-2 h-[64px]  text-right">
              <div className="border rounded-md px-2 py-1 w-[90px] flex justify-center items-center">Идэвхтэй</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
      <TableCaption></TableCaption>
    </Table>
  );
};

export default StudentsTable;
