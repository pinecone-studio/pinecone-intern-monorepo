import { LeftNavbar } from './LeftNavbar';
import { RightNavbar } from './RightNavbar';
import { Hotel } from '@/generated';

interface MainResultSearchProps {
  data: Array<Hotel | null>;
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
}

export const MainResultSearch = ({ data, setSearchValuePrice }: MainResultSearchProps) => {
  return (
    <div>
      <div className="container mx-auto flex gap-[48px] px-[60px] py-[32px] justify-center">
        <LeftNavbar />
        <RightNavbar data={data} setSearchValuePrice={setSearchValuePrice} />
      </div>
    </div>
  );
};
