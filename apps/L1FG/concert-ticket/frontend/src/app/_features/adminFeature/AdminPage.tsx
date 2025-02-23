import { AdminDialog } from '../../../components/adminfeature/AdminDialog';
import { AdminHeader } from '../../../components/header/AdminHeader';
import { ConcertFormProvider } from '../../../components/admincontext/DialogContext';
import { FormData } from '../../../components/adminfeature/concert-type';
import { useCreateConcertMutation, useGetConcertsQuery } from '@/generated';

import AdminTable from './AdminHero';
import { toast } from '@/components/ui/use-toast';

export const AdminPage = () => {
  const [createConcert] = useCreateConcertMutation();
  const { refetch } = useGetConcertsQuery();
  const handleFormSubmit = (concertInput: FormData) => {
    createConcert({
      variables: { input: concertInput },
      onCompleted: () => {
        toast({ title: 'Амжилттай', description: 'Тасалбар амжилттай нэмэгдлээ' });
        refetch();
      },
      onError: (error) => {
        toast({
          title: 'Алдаа гарлаа',
          description: error.message,
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
