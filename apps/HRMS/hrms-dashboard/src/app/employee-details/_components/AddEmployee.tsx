import { MdOutlineAdd } from 'react-icons/md';
export const AddEmployee = () => {
  return (
    <div data-testid="container" className="flex justify-between w-[1154px] py-5 px-6 items-center">
      <h1 className="text-2xl font-bold  ">Ажилчид</h1>
      <button data-testid="addButton" className="flex items-center justify-center gap-2 bg-[#F7F7F8] hover:bg-gray-200 ease-in-out duration-500 px-4 py-2 text-[#121316] rounded-lg">
        <MdOutlineAdd className="w-5 h-5" />
        Ажилтан нэмэх
      </button>
    </div>
  );
};
