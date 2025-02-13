import { AdminDialog } from '../adminfeature/AdminDialog';
import { AdminTable } from '../adminHero/AdminHero';
import { AdminHeader } from '../header/AdminHeader';
import { ConcertFormProvider } from '../admincontext/DialogContext';
import { FormData } from '../adminfeature/concert-type';
export const AdminPage = () => {
  const handleFormSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="text-white  ">
      <div className="pt-4 pr-6 pl-6">
        <AdminHeader />
      </div>
      <div id="pageWrapper" className="flex items-center justify-center mt-8 bg-[#F4F4F5]">
        <div id="outerContainer" className="container w-[1200px] h-[1041px]   mt-10">
          <div id="mainContainer" className="flex items-center justify-between  ">
            <div className="text-black ">
              <p className="font-bold text-lg">Тасалбар</p>
              <p className="font-medium text-sm text-[#71717A]">Идэвхтэй зарагдаж буй тасалбарууд</p>
            </div>
            <ConcertFormProvider onSubmit={handleFormSubmit}>
              <AdminDialog />
            </ConcertFormProvider>
          </div>
          <div className="border-b mt-6 "></div>
          <div>
            <AdminTable />
          </div>
        </div>
      </div>
    </div>
  );
};
