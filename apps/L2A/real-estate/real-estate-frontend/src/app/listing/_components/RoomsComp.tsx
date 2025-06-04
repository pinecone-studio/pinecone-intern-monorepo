import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RoomsCompProps } from '@/lib/typescripts';
import { motion } from 'framer-motion';

const RoomsComp = ({ totalRooms, setTotalRooms }: RoomsCompProps) => {
  const selectedRooms = totalRooms?.split(',').map(Number) ?? [];

  const toggleRoom = (value: number) => {
    const updated = selectedRooms.includes(value) ? selectedRooms.filter((v) => v !== value) : [...selectedRooms, value];
    setTotalRooms(updated.join(','));
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="block mb-2">Өрөө</Label>
        {[1, 2, 3, 4, 5].map((room) => (
          <div key={room} className="flex items-center gap-2 hover:text-gray-500" data-cy={`room-${room}`}>
            <motion.div
              whileTap={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 50}}
              className="flex items-center gap-2">
              <Checkbox id={`room-${room}`} checked={selectedRooms.includes(room)} onCheckedChange={() => toggleRoom(room)} />
            </motion.div>
            <Label htmlFor={`room-${room}`}>{room} өрөө</Label>
          </div>
        ))}
      </div>
    </>
  );
};
export default RoomsComp;
