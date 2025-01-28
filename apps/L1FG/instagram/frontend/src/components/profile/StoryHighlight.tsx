import { Plus } from 'lucide-react';
import StoryHighlightModal from './StoryHighlightModal';

const StoryHighlight = () => {
  return (
    <StoryHighlightModal>
      <div className="p-8">
        <div className="flex flex-col gap-4">
          <p className="rounded-full border h-20 w-20 flex justify-center items-center bg-gray-100 ">
            <Plus className="h-10 w-10  " color="white " />
          </p>
          <p className="ml-7">New</p>
        </div>
      </div>
    </StoryHighlightModal>
  );
};
export default StoryHighlight;
