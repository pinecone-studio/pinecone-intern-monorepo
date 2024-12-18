import Link from 'next/link';

const Header = () => {
  return (
    <div className="absolute w-screen flex justify-center items-center  pt-4 bg-transparent">
      <div className="max-w-[1180px] w-screen flex justify-between">
        <div className="flex items-center">
          <img className="w-[100px] h-[24px]" src="hl.png" alt="" />
        </div>
        <div className="flex w-[226px] items-center justify-between h-[40px]">
          <Link href="signup" className="text-white text-sm font-medium">
            Create Account
          </Link>
          <Link href="signin" className="font-medium text-sm bg-white px-4 py-2 items-center flex text-black rounded-full">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
