import FilterHotelsAdmin from './_components/FilterHotelsAdmin';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import HotelsTable from './_features/HotelsTable';

const Hotels = () => {
  return (
    <div data-cy="Hotels-Page" className="p-6 w-full h-screen bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hotels</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Hotel
        </Button>
      </div>
      <FilterHotelsAdmin />
      <div className="mt-6 bg-white rounded-md border shadow-sm">
        <HotelsTable />
      </div>
    </div>
  );
};

export default Hotels;
