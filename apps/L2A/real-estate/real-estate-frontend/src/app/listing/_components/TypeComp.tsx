import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TypeCompProps } from "@/lib/typescripts";
import { motion } from 'framer-motion';

const TypeComp = ({ type, setType }: TypeCompProps) => {
  const selectedTypes = type?.split(',') ?? [];

  const toggleType = (value: string) => {
    const current = type?.split(',').filter(Boolean) ?? [];
    const updated = current.includes(value)
      ? current.filter((t) => t !== value)
      : [...current, value];
    setType(updated.join(','));
  };
  return (
    <>
      <div className='mb-[-20px]'>Төрөл</div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 hover:text-gray-500" data-cy="type-apartment">
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50}}
            className="flex items-center gap-2 "
          >
            <Checkbox
              id="apartment"
              checked={selectedTypes.includes("APARTMENT")}
              onCheckedChange={() => toggleType("APARTMENT")}
            />
          </motion.div>
          <Label htmlFor="apartment">Байр</Label>
        </div>

        <div className="flex items-center gap-2 hover:text-gray-500" data-cy="type-house">
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50}}
            className="flex items-center gap-2"
          >
            <Checkbox
              id="house"
              checked={selectedTypes.includes("HOUSE")}
              onCheckedChange={() => toggleType("HOUSE")}
            />
          </motion.div>
          <Label htmlFor="house">Хаус</Label>
        </div>

        <div className="flex items-center gap-2 hover:text-gray-500" data-cy="type-office">
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50}}
            className="flex items-center gap-2"
          >
            <Checkbox
              id="office"
              checked={selectedTypes.includes("OFFICE")}
              onCheckedChange={() => toggleType("OFFICE")}
            />
          </motion.div>
          <Label htmlFor="office">Оффис</Label>
        </div>
      </div>


    </>
  )
}
export default TypeComp