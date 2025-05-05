const SignupHeader = ({ step, email }: { step: number; email: string }) => {
    return (
      <div className="text-center" data-cy="signup-header">
        <div className="text-4xl font-bold text-orange-600" data-cy="logo">🏠</div>
        <h2 className="text-2xl font-bold" data-cy="title">Home Vault</h2>
        {step === 3 && <h2 className="text-[20px] pt-[15px]">Create password</h2>}
        <div className="mt-2 text-gray-600" data-cy="subtitle">
          {step === 2 ? (
            <div>
              To continue, enter the secure code we sent to <b>{email}</b>.
              Check junk mail if it’s not in your inbox.
            </div>
          ) : step === 3 ? (
            <div className="text-[14px]">
              Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers
            </div>
          ) : (
            <div>Enter your email below to sign in</div>
          )}
        </div>
      </div>
    );
  };
export default SignupHeader;
  