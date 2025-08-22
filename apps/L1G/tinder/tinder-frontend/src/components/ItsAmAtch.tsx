import { X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MatchProps {
  onClose?: () => void;
}

const Match = ({ onClose }: MatchProps) => {
  return (
    <div className="bg-white rounded-3xl max-w-sm w-full mx-auto shadow-2xl border border-[#E4E4E7]">
      <div className="flex justify-between items-center p-6">
        <p className="text-[16px] font-semibold gap-2 text-start text-[#09090B]">Its a Match</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} aria-label="Close icon" role="img" />
        </button>
      </div>

      <div className="w-full flex flex-col justify-start items-center px-6 pb-6">
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="w-[152px] h-[152px] relative left-[20px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src="/profile.jpg" alt="Your profile" className="w-full h-full object-cover" aria-label="zurag1" role="img" />
              </div>
            </div>
            <div className="relative">
              <div className="w-[152px] h-[152px] relative right-[20px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src="/profile.jpg" alt="Baatarvan's profile" className="w-full h-full object-cover" aria-label="zurag2" role="img" />
              </div>
            </div>
          </div>

          <p className="text-[#09090B] text-[14px] font-normal font-sans">You matched with Baatarvan</p>

          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-center items-center">
              <Input
                type="text"
                placeholder="Say something nice"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>

            <button className="gap-2 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-full font-semibold text-lg flex items-center justify-center hover:from-pink-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
              <Send size={20} />
              <p data-testid="Send" className="text-[14px] font-sans font-medium">
                Send
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
