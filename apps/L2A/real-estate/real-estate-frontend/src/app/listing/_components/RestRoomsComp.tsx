import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RestRoomsCompProps } from '@/lib/typescripts';
import { motion } from 'framer-motion';

const RestRoomsComp = ({ restrooms, setTotalRestrooms }: RestRoomsCompProps) => {
  const selectedRestrooms = restrooms?.split(',').map(Number) ?? [];

  const toggleRestroom = (value: number) => {
    const updated = selectedRestrooms.includes(value) ? selectedRestrooms.filter((v) => v !== value) : [...selectedRestrooms, value];
    setTotalRestrooms(updated.join(','));
  };
  return (
    <>
      <div className="space-y-2">
        <Label className="block mb-2">Ариун цэврийн өрөө</Label>
        {[1, 2, 3].map((bath) => (
          <div key={bath} className="flex items-center gap-2 hover:text-gray-500" data-cy={`bath-${bath}`}>
            <motion.div
              whileTap={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 50}}
              className="flex items-center gap-2">
              <Checkbox id={`bath-${bath}`} checked={selectedRestrooms.includes(bath)} onCheckedChange={() => toggleRestroom(bath)} />
            </motion.div>
            <Label htmlFor={`bath-${bath}`}>{bath} өрөө</Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RestRoomsComp;
