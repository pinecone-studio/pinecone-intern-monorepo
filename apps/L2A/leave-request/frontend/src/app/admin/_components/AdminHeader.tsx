import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const AdminHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="mt-5 ml-10 mr-10 flex items-center justify-between">
      <img src="PineconeStudio.png" className="bg-white" alt="Pinecone Studio Logo" />
      <div className="flex items-center gap-4">
        <button className="rounded-full border p-2" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Moon aria-label="Moon Icon" /> : <Sun aria-label="Sun Icon" />}
        </button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
