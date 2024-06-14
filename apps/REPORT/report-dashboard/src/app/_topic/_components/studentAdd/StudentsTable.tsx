import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../../../../src/components/ui/table';
import { Chip, Chip1 } from './Chip';
import { Dropdown } from './Dropdown';

const invoices = [
  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },
  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },
  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },
  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },

  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },
  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },
  {
    profileImg: '/images/studentProfile.jpg',
    name: 'Б.Эрдэнэтунгалаг  ',
    studentCode: '23lu4444 ',
    status: <Chip />,
    email: 'Erdenechimeg.b@gmail.com ',
    phonenumber: '99998988 ',
  },
];

export function StudentsTable() {
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
        {invoices.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2 w-[200px]">
              <img className="w-[30px] h-[30px]  rounded-full" src={invoice.profileImg} alt="student" />
              <h1>{invoice.name}</h1>
            </TableCell>

            <TableCell>{invoice.studentCode}</TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell>{invoice.phonenumber}</TableCell>
            <TableCell className="font-medium flex items-center gap-2  text-right">
              <div>{invoice.status}</div>
              <Dropdown />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
