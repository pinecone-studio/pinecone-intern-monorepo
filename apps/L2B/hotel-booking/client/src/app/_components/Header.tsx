import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-[#013B94] w-scren h-16 px-3 flex items-center">
      <div className="flex w-[75%] items-center justify-between m-auto">
        <div className="flex gap-1 items-center">
          <div className="bg-white w-5 h-5 rounded-full"></div>
          <p className="text-white font-light text-xl">Pedia</p>
        </div>
        <div data-testid="link" className="flex gap-4 text-[#fafafa] text-sm">
          <Link href={'/signup'} className="px-4 py-2 flex items-center justify-center">
            Register
          </Link>
          <Link href={'/signin'} className="px-4 py-2 flex items-center justify-center">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Header;
