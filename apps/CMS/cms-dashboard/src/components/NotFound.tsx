import { Meh } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <Meh strokeWidth={1} size={84} />
        <h1 data-cy="not-found-404" className="font-bold text-[32px]">
          404
        </h1>
        <p className="text-muted-foreground">This page could not be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
