import Done from '@/components/common/Done';
import DateOfBirth from '@/components/signup/DateOfBirth';
import { ImageUpload } from '@/components/signup/ImageUpload';
import { InterestSelect } from '@/components/signup/InterestSelect';
import UserInformation from '@/components/signup/UserInformation';
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
