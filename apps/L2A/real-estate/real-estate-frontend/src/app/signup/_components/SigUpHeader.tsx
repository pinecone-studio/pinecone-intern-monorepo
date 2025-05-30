import Image from "next/image";

const SignupHeader = ({ step, email }: { step: number; email: string }) => {
  return (
    <div className="text-center" data-cy="signup-header">
      <div className="flex gap-3 items-center justify-center mb-8" data-cy="logo">
        <Image src="/logo.png" alt="logo" width={34} height={18} />
        <h2 className="text-2xl font-bold" data-cy="title">Home Vault</h2>
      </div>
      {step === 3 && <h2 className="text-[20px] pt-[15px]">Create password</h2>}
      <div className="mt-2 " data-cy="subtitle">
        {step === 2 ? (
          <div className="text-sm text-[#71717A] ">
            <p className="text-2xl font-bold text-center text-[#09090B]">Confirm email</p>
            To continue, enter the secure code we sent to <br /> <b>{email}</b>.
            Check junk mail if it’s not in
            <br /> your inbox.
          </div>
        ) : step === 3 ? (
          <div className="text-[14px]">
            Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers
          </div>
        ) : (
          <div>
            <p className="text-[24px] font-bold">Create an account</p>
            <p className="text-[#71717A] ">Enter your email below to create your account</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SignupHeader;
