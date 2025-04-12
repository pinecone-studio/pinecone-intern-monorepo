import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, XIcon } from 'lucide-react';

type Props = {
  input: string;
  isStreaming: boolean;
  onChange: (_val: string) => void;
  onSend: () => void;
  onStop: () => void;
};

export const ChatInput = ({ input, isStreaming, onChange, onSend, onStop }: Props) => (
  <div className="relative flex items-center">
    <Input
      value={input}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      }}
      placeholder="Message"
      className="pr-12 text-black placeholder-gray-500 bg-gray-100 border-gray-300 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-700 focus:ring-0 focus:border-black dark:focus:border-white"
    />
    {isStreaming ? (
      <Button onClick={onStop} className="absolute -translate-y-1/2 right-2 top-1/2 hover:bg-gray-200 dark:hover:bg-gray-700" size="icon" variant="ghost">
        <XIcon className="w-5 h-5 text-black dark:text-white" />
        <span className="sr-only">Stop</span>
      </Button>
    ) : (
      <Button onClick={onSend} className="absolute -translate-y-1/2 right-2 top-1/2 hover:bg-gray-200 dark:hover:bg-gray-700" size="icon" variant="ghost">
        <ArrowUpIcon className="w-5 h-5 text-black dark:text-white" />
        <span className="sr-only">Send</span>
      </Button>
    )}
  </div>
);
