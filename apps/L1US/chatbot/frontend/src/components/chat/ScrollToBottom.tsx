import { Button } from '@/components/ui/button';

type Props = {
  onClick: () => void;
};

export const ScrollToBottom = ({ onClick }: Props) => (
  <div className="fixed z-50 bottom-24 right-4">
    <Button onClick={onClick} className="px-4 py-2 text-sm text-black bg-white rounded-full shadow-md dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
      Scroll to Bottom ↓
    </Button>
  </div>
);
