import { Bookmark } from 'lucide-react';
import { Footer } from '../Footer';

const Save = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center gap-5 mt-20">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="rounded-full border-2 border-black h-20 w-20 flex justify-center items-center" aria-label="Camera Icon">
            <Bookmark className="h-10 w-10" />
          </div>
          <h2 className="font-semibold text-3xl">Saved</h2>
        </div>

        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <p>Save photos and videos that you want to see again.</p>
            <p>No one is notified, and only you can see what you ve</p>
            <p>saved.</p>
          </div>
        </div>
      </div>
      <div className="p-3"></div>
      <Footer />
    </div>
  );
};
export default Save;
