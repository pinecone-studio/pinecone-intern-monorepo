import { ProfileForm } from './FormFIeld';
import TinderLogo from './TinderLogo';
import TitleContainer from './TitleContainer';

const YourDetailsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background gap-6">
      <TinderLogo />
      <TitleContainer boldTitle="Your Details" greyText="Please provide the following information to help us get to know you better." />
      <ProfileForm />
    </div>
  );
};
export default YourDetailsPage;
