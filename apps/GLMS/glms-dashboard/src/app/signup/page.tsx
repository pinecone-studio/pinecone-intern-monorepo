import SignUpForm from './_features/SignUpForm';

const SignUp = () => {
  return (
    <div className="w-full h-[100vh] flex" data-cy="Article-Page">
      <div className="w-[50%] h-full flex items-center justify-center">
        <SignUpForm />
      </div>
      <div className="w-[50%] h-full flex justify-center items-center bg-[#121316]">
        <div className="flex align-end">
          <div className="flex gap-2">
            <img src={'./Academy.png'} alt="Pinecone logo" height={128} width={440} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
