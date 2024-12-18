import { DateOfBirth } from '@/components/UserDetails/DateOfBirth';
import { Done } from '@/components/UserDetails/Done';
import { ImageUpload } from '@/components/UserDetails/Image-upload';
import { InterestSelect } from '@/components/UserDetails/InterestSelect';
import { UserDetails } from '@/components/UserDetails/User-details';

const Page = () => {
  return (
    <>
      <InterestSelect />
      <DateOfBirth />
      <UserDetails />
      <ImageUpload />
      <Done />
    </>
  );
};

export default Page;
