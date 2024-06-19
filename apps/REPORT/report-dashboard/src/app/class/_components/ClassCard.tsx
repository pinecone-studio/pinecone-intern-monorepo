import { Class } from '@/generated';

type ClassWithTypename = Class & { __typename?: 'Class' };

export const ClassCard = ({ data }: { data: ClassWithTypename }) => {
  return (
    <div data-testid="class-card" className="flex px-[16px] pt-[8px] pb-[16px] flex-col flex-100 items-stretch border w-[256px] rounded-lg border-[#E0E0E0] bg-[#FFFFFF]">
      <div className="flex w-[168px] flex-col items-start gap-[16px]">
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-[20px] font-bold leading-[150%]">{data?.name}</h3>
          <p className="text-xs font-medium text-[#525252]">
            {data?.startDate} - {data?.endDate}
          </p>
        </div>
        <div className="flex items-start gap-[8px]">
          {data?.teachers?.map((teacher, index) => (
            <div key={index} className="flex py-[2px] px-[6px] rounded-[4px] bg-[#E0E0E0]">
              <p className="text-xs">{teacher}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
