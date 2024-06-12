import SignInModal from './_features/SignInModal';

const SignIn = () => {
  return (
    <div className=" w-full h-[100vh] flex">
      <div className="w-[50%] bg-[#FFF] flex items-center justify-center">
        <SignInModal />
      </div>
      <div className="w-[50%] flex h-full bg-[#121316] items-center justify-center">
        <div className="flex">
          <img src="/Academy.svg" alt="Pincone Logo" height={128} width={440} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
