import { DateOfBirth } from '@/components/UserDetails/DateOfBirth';
import { Done } from '@/components/UserDetails/Done';
import { InterestSelect } from '@/components/UserDetails/InterestSelect';


const page = () => {
  return (
    <div>
      <InterestSelect />
      <DateOfBirth />
      <Done />
    </div>
  );
};

export default page;
