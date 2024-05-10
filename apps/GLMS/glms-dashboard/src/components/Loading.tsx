const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[90vh] w-screen">
      <div className="text-center">
        <div className="loading loading-spinner m-auto loading-lg" />
        <div className="text-xl ">Loading...</div>
      </div>
    </div>
  );
};
export default Loading;
