import { UpdateButton } from '../../../_components';

type UpdateDependantProps = {
  dependantPhone: string | null | undefined;
  dependency: string | null | undefined;
};

export const UpdateDependant = (props: UpdateDependantProps) => {
  return (
    <section data-cy="updateDependant" className="flex flex-col w-full bg-white rounded-xl p-6 gap-6 ">
      <div className="flex justify-between">
        <p className="text-black text-lg font-semibold cursor-pointer">Хөдөлмөр эрхлэлтийн мэдээлэл</p>
        {props.dependency ? (
          <UpdateButton />
        ) : (
          <button
            className="flex gap-1 py-2 px-3 justify-center items-center bg-[#F6F6F6] rounded-lg"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <p className="text-[17px]  mb-[2px]">+</p>
            <p>Нэмэлт мэдээлэл нэмэх</p>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Яаралтай үед холбоо барих хүний дугаар</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.dependantPhone}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Регистрын дугаар</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.dependency}</p>
      </div>
    </section>
  );
};
