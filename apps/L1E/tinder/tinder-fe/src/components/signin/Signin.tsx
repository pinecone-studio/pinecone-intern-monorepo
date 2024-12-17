import Link from 'next/link';

const Signin = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      <div className="w-[350px] flex flex-col items-center justify-between h-[460px]">
        <img className="w-[100px] h-[24px]" src="redlogo.png" alt="" />
        <div className="flex gap-2 h-[72px] items-center flex-col">
          <div className="font-semibold text-2xl">Sign in</div>
          <div className="font-normal text-sm text-[#71717A]">Enter your email below to sign in</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="font-medium text-sm">Email</div>
              <input placeholder="name@example.com" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" name="" id="" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex w-[350px] justify-between">
                <div className="font-medium text-sm">Password</div>
                <Link href="forgetpassword" className="font-normal text-sm text-[#2563EB]">
                  Forget password ?
                </Link>
              </div>
              <input placeholder="Password" className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]" type="text" name="" id="" />
            </div>
          </div>
          <button className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48E5]">Continue</button>
          <div className="flex justify-between items-center">
            <div className="w-[146px] h-[1px] border-[1px] border-[#E4E4E7]"></div>
            <div className="text-xs text-[#71717A]">OR </div>
            <div className="w-[146px] h-[1px] border-[1px] border-[#E4E4E7]"></div>
          </div>
          <Link href="signup" className="font-medium text-sm w-[350px] text-center h-[36px] rounded-full px-3 py-2 border-[1px] border-[#E4E4E7] text-black">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
