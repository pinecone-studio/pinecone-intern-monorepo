import AddTicketDialog from './_featured/AddTicketDialog';

const Page = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-secondary">
      <div className="flex flex-col items-center w-full h-full p-10">
        <div className=" w-9/12 bg-background flex justify-between p-5 rounded-2xl">
          <div>
            <div className="font-bold">Концерт</div>
            <div className=" text-gray-400 text-xs">Идэвхитэй зарагдаж буй концертууд</div>
          </div>
          <AddTicketDialog />
        </div>
      </div>
    </div>
  );
};
export default Page;
