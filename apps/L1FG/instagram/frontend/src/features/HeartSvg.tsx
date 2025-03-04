import { useAuth } from '@/components/providers/AuthProvider';

export const HeartSVG = ({ isOpen }: { isOpen?: boolean }) => {
  const { notification, setNotification } = useAuth();

  return (
    <div onClick={() => setNotification(false)} data-testid="heart-svg" className="relative">
      <svg className={`${isOpen ? 'fill-black' : 'fill-none'}`} width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 12C19.49 10.54 21 8.79 21 6.5C21 5.04131 20.4205 3.64236 19.3891 2.61091C18.3576 1.57946 16.9587 1 15.5 1C13.74 1 12.5 1.5 11 3C9.5 1.5 8.26 1 6.5 1C5.04131 1 3.64236 1.57946 2.61091 2.61091C1.57946 3.64236 1 5.04131 1 6.5C1 8.8 2.5 10.55 4 12L11 19L18 12Z"
          stroke="#09090B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {notification && <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white w-2.5 h-2.5 rounded-full" />}
    </div>
  );
};
