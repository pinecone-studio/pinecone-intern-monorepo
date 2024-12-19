import { DateOfBirth } from '@/components/user/DateOfBirth';
import { Done } from '@/components/user/Done';
import { ImageUpload } from '@/components/user/ImageUpload';
import { InterestSelect } from '@/components/user/InterestSelect';
import { UserInformation } from '@/components/user/UserInformation';
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
