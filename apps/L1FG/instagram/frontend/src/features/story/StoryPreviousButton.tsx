import { ChevronLeft } from 'lucide-react';

export const StoryPreviousButton = ({ shouldExist, handlePrevious }: { shouldExist: boolean; handlePrevious: () => void }) => {
  if (shouldExist) {
    return (
      <button onClick={handlePrevious} data-testid="previous-button" className="w-5 h-5 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
        <ChevronLeft />
      </button>
    );
  }
  return <div className="w-5 h-5"></div>;
};
