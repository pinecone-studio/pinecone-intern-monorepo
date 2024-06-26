import { AddModal } from './AddModal';
export const AddEmployee = () => {
  return (
    <div data-testid="container" className="flex justify-between w-[1154px] py-5 px-6 items-center">
      <h1 className="text-2xl font-bold  ">Ажилчид</h1>
      <AddModal />
    </div>
  );
};
