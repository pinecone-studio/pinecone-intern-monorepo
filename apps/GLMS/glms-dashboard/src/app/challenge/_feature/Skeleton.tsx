const Skeleton = () => {
  return (
    <div className="animate-pulse py-10 w-1/3 h-full mt-[75px]">
      <div className="h-8 bg-gray-100 rounded-xl dark:bg-gray-300 mb-[150px]" />
      <div
        className="h-20 border-gray-100 border-2 
      rounded-xl py-7 px-5 dark:border-gray-300 
      mb-6 flex gap-3"
      >
        <div className="h-4 w-full bg-gray-100 rounded-xl dark:bg-gray-300" />
        <div className="h-4 w-4 bg-gray-100 rounded-sm dark:bg-gray-300" />
      </div>
      <div
        className="h-20 border-gray-100 border-2 
      rounded-xl py-7 px-5 dark:border-gray-300 
      mb-6 flex gap-3"
      >
        <div className="h-4 w-full bg-gray-100 rounded-xl dark:bg-gray-300" />
        <div className="h-4 w-4 bg-gray-100 rounded-sm dark:bg-gray-300" />
      </div>
      <div
        className="h-20 border-gray-100 border-2 
      rounded-xl py-7 px-5 dark:border-gray-300 
      mb-6 flex gap-3"
      >
        <div className="h-4 w-full bg-gray-100 rounded-xl dark:bg-gray-300" />
        <div className="h-4 w-4 bg-gray-100 rounded-sm dark:bg-gray-300" />
      </div>
      <div
        className="h-20 border-gray-100 border-2 
      rounded-xl py-7 px-5 dark:border-gray-300 
      mb-6 flex gap-3"
      >
        <div className="h-4 w-full bg-gray-100 rounded-xl dark:bg-gray-300" />
        <div className="h-4 w-4 bg-gray-100 rounded-sm dark:bg-gray-300" />
      </div>
    </div>
  );
};

export default Skeleton;
