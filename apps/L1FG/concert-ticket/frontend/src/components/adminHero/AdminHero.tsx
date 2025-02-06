import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const AdminTable = () => {
  return (
    <div>
      <div className="mt-6 mb-6 ">
        <p className="text-black">Admin Search</p>
      </div>
      <div className="w-[1200px] h-[800px] border rounded-[6px] bg-[#FFFFFF] ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Онцлох</TableHead>
              <TableHead>Тоглолтын нэр</TableHead>
              <TableHead>Артист</TableHead>
              <TableHead>Нийт тоо</TableHead>
              <TableHead>VIP</TableHead>
              <TableHead>Regular</TableHead>
              <TableHead>Задгай</TableHead>
              <TableHead>Тоглох өдрүүд</TableHead>
              <TableHead>Нийт ашиг</TableHead>
              <TableHead>Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>
    </div>
  );
};
