import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 bg-gray-300 rounded-full dark:bg-gray-800">
      {theme === 'dark' ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-blue-500" />}
    </button>
  );
};

export default ThemeSwitcher;
