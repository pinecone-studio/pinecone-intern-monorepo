import { ProfileForm } from './FormFIeld';
import TinderLogo from './TinderLogo';
import TitleContainer from './TitleContainer';

const YourDetailsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
        <TinderLogo />
        <TitleContainer boldTitle="Your Details" greyText="Please provide the following information to help us get to know you better." />
        <ProfileForm />
      </div>
    </div>
  );
};
export default YourDetailsPage;
