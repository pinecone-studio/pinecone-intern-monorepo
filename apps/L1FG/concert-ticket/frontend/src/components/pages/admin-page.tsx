import { AdminDialog } from '../adminfeature/AdminDialog';
import { AdminHeader } from '../header/AdminHeader';
import { ConcertFormProvider } from '../admincontext/DialogContext';
import { FormData } from '../adminfeature/concert-type';
import { useCreateConcertMutation, useGetConcertsQuery } from '@/generated';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminTable from '../../app/_features/adminFeature/AdminHero';

export const AdminPage = () => {
  const [createConcert] = useCreateConcertMutation();
  const { refetch } = useGetConcertsQuery();
  const handleFormSubmit = (concertInput: FormData) => {
    createConcert({
      variables: { input: concertInput },
      onCompleted: () => {
        toast.success('Тасалбар амжилттай үүсгэгдлээ!', {
          position: 'top-right',
          autoClose: 3000,
        });
        refetch();
      },
      onError: (error) => {
        toast.error(`Алдаа гарлаа: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <div className="text-white">
      <div className="pt-4 pr-6 pl-6  ">
        <AdminHeader />
      </div>
      <div id="pageWrapper" data-testid="pageWrapper" className="flex items-center justify-center mt-8 bg-[#F4F4F5]">
        <div id="outerContainer" data-testid="outerContainer" className="container w-[1200px] h-[1041px] mt-10">
          <div id="mainContainer" className="flex items-center justify-between">
            <div className="text-black">
              <p className="font-bold text-lg">Тасалбар</p>
              <p className="font-medium text-sm text-[#71717A]">Идэвхтэй зарагдаж буй тасалбарууд</p>
            </div>
            <ConcertFormProvider onSubmit={handleFormSubmit}>
              <AdminDialog />
            </ConcertFormProvider>
          </div>
          <div className="mt-6"></div>
          <div>
            <AdminTable />
          </div>
        </div>
      </div>
    </div>
  );
};
