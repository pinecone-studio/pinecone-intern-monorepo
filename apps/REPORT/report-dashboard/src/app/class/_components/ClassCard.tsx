import { Class } from '@/generated';
import DropDownMenuButton from '../_features/DropDownMenuButton';
export type ClassWithTypename = Class & { __typename?: 'Class' };
import { useRouter } from 'next/navigation';

const ClassCard = ({ data }: { data: ClassWithTypename }) => {
  const router = useRouter();
  return data ? (
    <div
      onClick={() => router.push(`/class/${data?._id}`)}
      data-testid="class-card"
      className="flex flex-col items-start gap-[12px] relative w-[416px] p-[24px] border border-[#E0E0E0] bg-[#FFFFFF] rounded-lg group cursor-pointer"
    >
      <div className="flex flex-col justify-center">
        <h3 className="text-[16px] font-normal leading-7">{data?.name}</h3>
        <p className="text-sm leading-5 font-medium text-[#71717A]">
          {data?.startDate} - {data?.endDate}
        </p>
      </div>
      <div className="flex items-start gap-[8px]">
        {data?.teachers?.map((teacher, index) => (
          <div key={index} className="flex py-[2px] px-[10px] rounded-[4px] border">
            <p className="text-xs">{teacher}</p>
          </div>
        ))}
      </div>
      <DropDownMenuButton classId={data._id} />
    </div>
  ) : (
    <p>No data available</p>
  );
};

export default ClassCard;
