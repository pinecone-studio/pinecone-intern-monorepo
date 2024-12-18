import { DateOfBirth } from '@/components/UserDetails/DateOfBirth';
import { Done } from '@/components/UserDetails/Done';
import { InterestSelect } from '@/components/UserDetails/InterestSelect';

const Page = () => {
  return (
    <>
      <InterestSelect />
      <DateOfBirth />
      <Done />
    </>
  );
};

export default Page;
