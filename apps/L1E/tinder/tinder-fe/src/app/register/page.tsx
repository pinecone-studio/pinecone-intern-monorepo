import { DateOfBirth } from '@/components/User/DateOfBirth';
import { Done } from '@/components/User/Done';
import { ImageUpload } from '@/components/User/ImageUpload';
import { InterestSelect } from '@/components/User/InterestSelect';
import { UserInformation } from '@/components/User/UserInformation';
const page = () => {
  return (
    <div>
      <InterestSelect />
      <DateOfBirth />
      <Done />
      <UserInformation />
      <ImageUpload />
    </div>
  );
};

export default page;
