import { ChevronRight } from 'lucide-react';

export const StoryNextButton = ({ shouldExist, handleNext }: { shouldExist: boolean; handleNext: () => void }) => {
  if (shouldExist) {
    return (
      <button onClick={handleNext} data-testid="next-button" className="w-5 h-5 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
        <ChevronRight />
      </button>
    );
  }
  return <div className="w-5 h-5"></div>;
};
