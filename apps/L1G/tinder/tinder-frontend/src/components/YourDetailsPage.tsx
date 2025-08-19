import { UserData } from '@/app/(auth)/signup/page';
import ProfileForm from './FormFIeld';
import TitleContainer from './TitleContainer';

type YourDetailsPageProps = {
  onSuccess: () => void;
  onBack: () => void;
  updateUserData: (newData: Partial<UserData>) => void;
};

const YourDetailsPage = ({ onSuccess, onBack, updateUserData }: YourDetailsPageProps) => {
  return (
    <div className="w-[400px] flex flex-col items-center justify-center bg-background px-4 " data-testid="details-page-container">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
        <TitleContainer boldTitle="Your Details" greyText="Please provide the following information to help us get to know you better." />
        <ProfileForm onSuccess={onSuccess} onBack={onBack} updateUserData={updateUserData} />
      </div>
    </div>
  );
};
export default YourDetailsPage;
