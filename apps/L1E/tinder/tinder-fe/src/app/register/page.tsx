import Done from '@/components/common/Done';
import DateOfBirth from '@/components/users/DateOfBirth';
import { ImageUpload } from '@/components/users/ImageUpload';
import { InterestSelect } from '@/components/users/InterestSelect';
import { UserInformation } from '@/components/users/UserInformation';
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
