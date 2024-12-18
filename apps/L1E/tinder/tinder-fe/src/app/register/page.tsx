import { DateOfBirth } from '@/components/UserDetails/DateOfBirth';
import { Done } from '@/components/UserDetails/Done';
import { InterestSelect } from '@/components/UserDetails/InterestSelect';
import { UserInformation } from '@/components/UserDetails/UserInformation';
const page = () => {
  return (
    <div>
      <InterestSelect />
      <DateOfBirth />
      <Done />
      <UserInformation />
    </div>
  );
};

export default page;
