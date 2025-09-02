import { X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGetUserQuery } from '@/generated';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const popupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const imageVariantsLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      delay: 0.3,
    },
  },
};

const imageVariantsRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      delay: 0.3,
    },
  },
};

type MatchPopupProps = {
  onClose: () => void;
  matchedusersid: string[];
};

const MatchPopup = ({ onClose, matchedusersid }: MatchPopupProps) => {
  const [id1, id2] = matchedusersid;

  const { data: user1Data, loading: loading1, error: error1 } = useGetUserQuery({ variables: { id: id1 }, skip: !id1 });
  const { data: user2Data, loading: loading2, error: error2 } = useGetUserQuery({ variables: { id: id2 }, skip: !id2 });

  if (loading1 || loading2) return <div>Loading...</div>;
  if (error1 || error2) return <div>Error loading match</div>;

  const user1 = user1Data?.getUser;
  const user2 = user2Data?.getUser;

  return (
    <motion.div variants={popupVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-3xl max-w-sm w-full mx-auto shadow-2xl border border-[#E4E4E7]">
      <div className="flex justify-between items-center p-6">
        <p className="text-[16px] font-semibold gap-2 text-start text-[#09090B]">It&#39s a Match</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} aria-label="Close icon" role="img" />
        </button>
      </div>

      <div className="w-full flex flex-col justify-start items-center px-6 pb-6">
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="flex justify-center items-center">
            <motion.div variants={imageVariantsLeft} initial="hidden" animate="visible">
              <div className="w-[152px] h-[152px] relative left-[20px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={user1?.images?.[0]} alt="Your profile" className="w-full h-full object-cover" aria-label="zurag1" role="img" />
              </div>
            </motion.div>
            <motion.div variants={imageVariantsRight} initial="hidden" animate="visible">
              <div className="w-[152px] h-[152px] relative right-[20px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={user2?.images?.[0]} alt={`${user2?.name}'s profile`} className="w-full h-full object-cover" aria-label="zurag2" role="img" />
              </div>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-[#09090B] text-[14px] font-normal font-sans">
            You matched with {user2?.name}
          </motion.p>

          <div className="w-full flex flex-col gap-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex justify-center items-center">
              <Input
                type="text"
                placeholder="Say something nice"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="gap-2 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-full font-semibold text-lg flex items-center justify-center hover:from-pink-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send size={20} />
              <p data-testid="Send" className="text-[14px] font-sans font-medium">
                Send
              </p>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchPopup;
