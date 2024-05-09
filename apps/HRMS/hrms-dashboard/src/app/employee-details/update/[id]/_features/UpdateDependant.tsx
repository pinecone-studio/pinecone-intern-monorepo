import { UpdateButton } from '../../../_components';

type UpdateDependantProps = {
  dependantPhone?: string;
  registerNumber?: string;
};

export const UpdateDependant = (props: UpdateDependantProps) => {
  return (
    <section className="flex flex-col w-full bg-white rounded-xl p-6 gap-6 ">
      <div className="flex justify-between">
        <p className="text-black text-lg font-semibold cursor-pointer">Хөдөлмөр эрхлэлтийн мэдээлэл</p>
        <UpdateButton />
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Яаралтай үед холбоо барих хүний дугаар</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.dependantPhone}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Регистрын дугаар</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.registerNumber}</p>
      </div>
    </section>
  );
};
