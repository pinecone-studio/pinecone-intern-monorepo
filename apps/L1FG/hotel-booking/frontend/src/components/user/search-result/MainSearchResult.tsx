import { LeftNavbar } from './LeftNavbar';
import { RightNavbar } from './RightNavbar';
import { Hotel } from '@/generated';

interface MainResultSearchProps {
  data: Array<Hotel>;
}

export const MainResultSearch = ({ data }: MainResultSearchProps) => {
  return (
    <div>
      <div className="container mx-auto flex gap-[48px] px-[60px] py-[32px] justify-center">
        <LeftNavbar />
        <RightNavbar data={data} />
      </div>
    </div>
  );
};
