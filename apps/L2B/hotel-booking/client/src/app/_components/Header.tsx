import Link from 'next/link';

const Header = () => {
  return (
    <div className="bg-[#013B94] w-screen h-[64px] flex items-center">
      <div className="flex w-[1280px] h-10 items-center justify-between m-auto">
        <div className="flex gap-[8px] items-center">
          <div className="bg-white w-[20px] h-[20px] rounded-full"></div>
          <p className="text-[#fafafa] font-light tracking-wide text-xl">Pedia</p>
        </div>
        <div data-testid="link" className="flex gap-[24px] items-center text-[#fafafa] text-sm">
          <Link href={'/signup'} className="w-18 h-10 flex items-center">
            Register
          </Link>
          <Link href={'/signin'} className="h-10 w-18 flex items-center">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
