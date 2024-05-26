const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen dark:bg-[#121316f7]">
      <div className="text-center dark:text-[#dedede]">
        <div className="loading loading-spinner m-auto loading-lg" />
        <div className="text-xl ">Loading...</div>
      </div>
    </div>
  );
};
export default Loading;
