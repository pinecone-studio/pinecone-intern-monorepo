import { Header } from '@/components/Header';
import { MyProfile } from '@/components/MyProfile';

const Profile = () => {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center">
      <Header />

      <div className="w-[1334px] h-fit flex flex-col gap-6 py-10 px-6">
        <MyProfile />
      </div>
    </div>
  );
};
export default Profile;
