import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { OthersCompProps } from "@/lib/typescripts"
import { motion } from 'framer-motion';

const OthersComp = ({ garage, setGarage, lift, setLift, balcony, setBalcony }: OthersCompProps) => {
  return (<>
    <div>
      <Label className="block mb-2">Бусад</Label>
      <div className="space-y-2">
        <div className="flex items-center gap-2 hover:text-gray-500" data-cy="option-garage">
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50}}
            className="flex items-center gap-2">
            <Checkbox id="garage" checked={garage === 'true'} onCheckedChange={(checked) => setGarage(checked ? 'true' : '')} />
          </motion.div>
          <Label htmlFor="garage">Дулаан зогсоол</Label>
        </div>
        <div className="flex items-center gap-2 hover:text-gray-500" data-cy="option-lift">
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50}}
            className="flex items-center gap-2">
            <Checkbox id="lift" checked={lift === 'true'} onCheckedChange={(checked) => setLift(checked ? 'true' : '')} />
          </motion.div>
          <Label htmlFor="lift">Лифт</Label>
        </div>
        <div className="flex items-center gap-2 hover:text-gray-500" data-cy="option-balcony">
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50}}
            className="flex items-center gap-2">
            <Checkbox id="balcony" checked={balcony === 'true'} onCheckedChange={(checked) => setBalcony(checked ? 'true' : '')} />
          </motion.div>
          <Label htmlFor="balcony">Агуулах</Label>
        </div>
      </div>
    </div>
  </>)
}

export default OthersComp