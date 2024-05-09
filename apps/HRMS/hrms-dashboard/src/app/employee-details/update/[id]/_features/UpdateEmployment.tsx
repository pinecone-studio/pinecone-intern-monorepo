import { UpdateButton } from '../../../_components';

type UpdateEmploymentProps = {
  jobTitle: string | null | undefined;
  department: string | null | undefined;
  dateOfEmployment: string | null | undefined;
  employmentStatus: string | null | undefined;
};

export const UpdateEmployment = (props: UpdateEmploymentProps) => {
  const today = new Date();
  const year = props.dateOfEmployment?.toString().slice(0, 4);
  const month = props.dateOfEmployment?.toString().slice(5, 7);
  const day = props.dateOfEmployment?.toString().slice(8, 10);

  const started = new Date(Number(year), Number(month), Number(day));
  const employedYear = Math.floor(today.getFullYear() - started.getFullYear());
  return (
    <section className="flex flex-col w-full bg-white rounded-xl p-6 gap-6 ">
      <div className="flex justify-between">
        <p className="text-black text-lg font-semibold cursor-pointer">Хөдөлмөр эрхлэлтийн мэдээлэл</p>
        <UpdateButton />
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Албан тушаал</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.jobTitle}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Хэлтэс</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.department}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Ажилд орсон өдөр</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.dateOfEmployment?.toString().slice(0, 10)}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Ажилласан хугацаа</p>
        <p className="w-full text-left text-main text-base font-semibold">{employedYear} жил</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Төлөв</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.employmentStatus}</p>
      </div>
    </section>
  );
};
