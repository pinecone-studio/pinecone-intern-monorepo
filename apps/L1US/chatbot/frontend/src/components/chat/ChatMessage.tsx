import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type Props = {
  role: 'user' | 'bot';
  content: string;
};

export const ChatMessage = ({ role, content }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({ title: 'Copied to clipboard!' });
  };
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%] space-y-2">
        <div
          className={`px-4 py-3 rounded-lg text-sm whitespace-pre-wrap break-words ${
            role === 'user' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
          }`}
        >
          {content}
        </div>
        {role === 'bot' && (
          <Button size="sm" variant="ghost" className="px-2 text-xs text-muted-foreground hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700" onClick={handleCopy}>
            <CopyIcon className="w-4 h-4 mr-1" />
            Copy
          </Button>
        )}
      </div>
    </div>
  );
};
