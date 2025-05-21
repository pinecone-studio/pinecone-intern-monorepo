import DashboardTable from './_components/DashboardTable';
import TicketDashboard from './_components/TicketDashboard';
import TicketFilterBar from './_components/TicketFilterBar';
import AddTicketDialog from './_featured/AddTicketDialog';

const Page = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-secondary">
      <div className="flex flex-col items-center w-full h-full p-10">
        <div className=" w-9/12 flex justify-between rounded-2xl">
          <div>
            <h1 className=" text-xl">Концерт</h1>
            <div className=" text-gray-400 text-s">Идэвхитэй зарагдаж буй концертууд</div>
          </div>
          <AddTicketDialog />
        </div>
        <div className="w-3/4 h-[1px] bg-gray-200 mt-7 "></div>
        <TicketFilterBar />
        <DashboardTable />
        <TicketDashboard />
      </div>
    </div>
  );
};
export default Page;
