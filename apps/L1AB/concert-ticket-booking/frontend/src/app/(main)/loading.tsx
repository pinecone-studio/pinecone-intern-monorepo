const MainLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute w-12 h-12 bg-[#00B7F4] rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-12 h-12 bg-[#00B7F4] rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default MainLoader;
