import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EmploymentInfoDialog } from './EmploymentInfoDialog';

const EmployeeInfoSection = () => {
  const infoFields = [
    { title: 'Албан тушаал', value: 'Дизайнер' },
    { title: 'Хэлтэс', value: 'Хөгжүүлэлтийн хэлтэс' },
    { title: 'Ажилд орсон өдөр', value: '2023-03-09' },
    { title: 'Ажилласан хугацаа', value: '1 жил' },
    { title: 'Төлөв', value: 'Үндсэн ажилтан' },
  ];

  return (
    <div className="h-full">
      <div className="flex justify-between mb-4">
        <p className="border-none p-0 text-black text-lg font-semibold">Хөдөлмөр эрхлэлтийн мэдээлэл</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Засварлах</Button>
          </DialogTrigger>
          <EmploymentInfoDialog infoFields={infoFields} />
        </Dialog>
      </div>
      {infoFields.map((field, index) => (
        <div key={index} className="mb-2 flex flex-col gap-4 ">
          <p className="border-none font-normal text-base p-0">{field.title}</p>
          <input className=" border-none font-semibold text-base p-0 text-black " type="text" placeholder={field.value} />
        </div>
      ))}
    </div>
  );
};
export default EmployeeInfoSection;
