import { UserData } from '@/app/(auth)/signup/page';
import TitleContainer from './TitleContainer';
import { ProfileForm } from './FormFIeld';

type YourDetailsPageProps = {
  onSuccess: () => void;
  onBack: () => void;
  userData: UserData;
  updateUserData: (_: Partial<UserData>) => void;
};

const YourDetailsPage = ({ onSuccess, onBack, userData, updateUserData }: YourDetailsPageProps) => {
  return (
    <div className="w-[400px] flex flex-col items-center justify-center bg-background px-4 overflow-scroll " data-testid="details-page-container">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
        <TitleContainer boldTitle="Your Details" greyText="Please provide the following information to help us get to know you better." />
        <ProfileForm onSuccess={onSuccess} onBack={onBack} updateUserData={updateUserData} userData={userData} />
      </div>
    </div>
  );
};
export default YourDetailsPage;
