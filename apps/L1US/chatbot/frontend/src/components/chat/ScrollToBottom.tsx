import { Button } from '@/components/ui/button';

type Props = {
  onClick: () => void;
};

export const ScrollToBottom = ({ onClick }: Props) => (
  <div className="fixed bottom-24 right-4 z-50">
    <Button onClick={onClick} className="bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md rounded-full px-4 py-2 text-sm">
      Scroll to Bottom ↓
    </Button>
  </div>
);
