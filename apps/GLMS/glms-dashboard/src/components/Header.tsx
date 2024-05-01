import SearchIcon from '../../public/search-icon';
import PositionIcon from '../../public/header-position';
import Logo from '../../public/logo';
const Header = () => {
  return (
    <div data-testid="header-artivle-detail" className="bg-[#F7F7F8]">
      <div className="flex h-12 items-center justify-between w-[85vw] m-auto">
        <Logo />
        <div data-testid="text-data-search" className="gap-3 items-center flex">
          <label className="input input-bordered flex items-center gap-2 h-8 outline-none">
            <SearchIcon />
            <input type="text" className="grow text-sm w-32 " placeholder="Search" />
          </label>
          <PositionIcon />
          <div className="w-8 h-8">
            <img className="rounded-full" src="/profile-image.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
