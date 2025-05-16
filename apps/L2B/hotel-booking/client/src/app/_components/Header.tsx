import Link from 'next/link';

const Header = () => {
  return (
    <div className="bg-[#013B94] w-screen h-[64px] flex items-center">
      <div className="flex w-[1280px] items-center justify-between m-auto">
        <div className="flex gap-[8px] items-center">
          <div className="bg-white w-[20px] h-[20px] rounded-full"></div>
          <p className="text-black text-[19px]">Pedia</p>
        </div>
        <div data-testid="link" className="flex gap-[16px] text-[#fafafa] text-[14px]">
          <Link href={'/signup'}>Register</Link>
          <Link href={'/signin'}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
