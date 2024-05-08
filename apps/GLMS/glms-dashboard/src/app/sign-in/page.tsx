import SignInForm from './_features/SignInForm';
import { PineconeLogoLogin } from 'apps/GLMS/glms-dashboard/public/assets/PineconeLogoLogin';

const SignIn = () => {
  return (
    <div className="w-[100%] h-screen  flex" data-cy="Article-Page">
      <div className="w-[50%] h-full flex justify-center items-center">
        <SignInForm />
      </div>
      <div className="w-[50%] h-full border ">
        <PineconeLogoLogin />
      </div>
    </div>
  );
};
export default SignIn;
