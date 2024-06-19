import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MdOutlineEdit, MdMoreVert } from 'react-icons/md';

const mockData = [
  {
    title: 'Marphosis Хөтөлбөр',
    category: 'SoftwareEngineer',
    status: 'нийтэлсэн',
    createdDate: '03.01.2024',
  },
  {
    title: 'Marphosis Хөтөлбөр',
    category: 'SoftwareEngineer',
    status: 'ноорог',
    createdDate: '03.01.2024',
  },
  {
    title: 'Marphosis Хөтөлбөр',
    category: 'SoftwareEngineer',
    status: 'архив',
    createdDate: '03.01.2024',
  },
  {
    title: 'Marphosis Хөтөлбөр',
    category: 'SoftwareEngineer',
    status: 'төлөвлөсөн',
    createdDate: '03.01.2024',
  },
  {
    title: 'Marphosis Хөтөлбөр',
    category: 'SoftwareEngineer',
    status: 'ноорог',
    createdDate: '03.01.2024',
  },
];

// type TableContentProps = {
//   text: string;
// };
export const TableContent = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 ">
        <Table data-cy="contentList" className="border rounded">
          {/* <TableCaption className="bg-red-300">A list of articles.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead data-cy="tableHeader-0" className="w-[100px]">
                Нийтлэл
              </TableHead>
              <TableHead data-cy="tableHeader-1">Статус</TableHead>
              <TableHead data-cy="tableHeader-2">Огноо</TableHead>
              <TableHead data-cy="tableHeader-3">Шошго</TableHead>
              <TableHead data-cy="tableHeader-4" className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="rounded">
            {mockData?.map((el, index) => {
              let color: string;

              switch (el.status) {
                case 'нийтэлсэн':
                  color = 'bg-emerald-200';
                  break;
                case 'төлөвлөсөн':
                  color = 'bg-blue-200';
                  break;
                case 'архив':
                  color = 'bg-yellow-200';
                  break;
                default:
                  color = 'bg-slate-200';
                  break;
              }
              return (
                <TableRow key={`${el}-${index}`} className=" *:px-6 *:py-4">
                  <TableCell className="font-medium px-6 py-4">{el.title}</TableCell>
                  <TableCell className="flex justify-center place-items-center">
                    <div className={`rounded-2xl px-2 w-fit text-center text-sm ${color}`}>{el.status}</div>
                  </TableCell>
                  <TableCell>{el.createdDate}</TableCell>
                  <TableCell>{el.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="w-18 h-10 flex flex-row justify-center items-center  ">
                      <button className="w-5 h-5">
                        <MdMoreVert />
                      </button>
                      <button className="w-5 h-5">
                        <MdOutlineEdit />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
