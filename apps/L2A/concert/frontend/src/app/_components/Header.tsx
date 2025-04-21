// components/Header.tsx

import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <span className="w-4 h-4 bg-sky-400 rounded-full inline-block"></span>
        <span>TICKET BOOKING</span>
      </div>

      {/* Search bar */}
      <div className="flex-1 mx-6 max-w-xl">
        <div className="flex items-center bg-black border border-gray-700 px-4 py-2 rounded-md">
          <input
            type="text"
            placeholder="Хайлт"
            className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
          />
          <FaSearch className="text-white" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <FaShoppingCart className="text-white text-xl" />
        <button className="border border-gray-700 px-4 py-2 rounded-md text-white">
          Бүртгүүлэх
        </button>
        <button className="bg-sky-400 hover:bg-sky-500 text-black font-medium px-4 py-2 rounded-md">
          Нэвтрэх
        </button>
      </div>
    </nav>
  );
};

export default Header;
