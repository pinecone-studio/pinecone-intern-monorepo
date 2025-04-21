import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sun } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <div>
      <div className="mt-5 ml-10 mr-10 flex items-center justify-between">
        <img src="Pinecone studio.png" />
        <div className="flex items-center gap-4">
          <button className="rounded-full border p-2">
            <Sun />
          </button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
